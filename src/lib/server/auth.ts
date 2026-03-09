import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sessions, users, type Session, type User } from './db/schema';
import { sha256 } from '@oslojs/crypto/sha2';
import { db } from './db';
import { eq } from 'drizzle-orm';
import type { Cookies } from '@sveltejs/kit';

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(token: string, userId: bigint): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		user_id: userId,
		expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days
	};
	await db.insert(sessions).values(session).onConflictDoNothing();
	return session;
}

export async function validateSession(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await db
		.select({ user: users, session: sessions })
		.from(sessions)
		.innerJoin(users, eq(sessions.user_id, users.id))
		.where(eq(sessions.id, sessionId));

	console.log('Auth: validateSession: Query result for token', token, ':', result);

	if (result.length < 1) {
		console.log('Auth: No session found for token:', token);
		return { session: null, user: null };
	}

	const { user, session } = result[0];
	if (Date.now() >= session.expires_at.getTime() - 1000 * 60 * 60 * 24 * 15) { // 15 days
		session.expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days
		await db
			.update(sessions)
			.set({ expires_at: session.expires_at })
			.where(eq(sessions.id, session.id));
	}

	return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export async function invalidateAllSessions(userId: bigint): Promise<void> {
	await db.delete(sessions).where(eq(sessions.user_id, userId));
}

export function setSessionTokenCookie(cookies: Cookies, token: string, expiresAt: Date): void {
	cookies.set('session', token, {
		httpOnly: true,
		sameSite: 'lax',
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(cookies: Cookies): void {
	cookies.set('session', '', {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 0,
		path: '/'
	});
}
