import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import { eq } from 'drizzle-orm';
import { verify } from "@node-rs/argon2";
import { createSession, generateSessionToken, setSessionTokenCookie } from "$lib/server/auth";

export const actions = {
	default: async({ request, cookies }) => {
		const formData = await request.formData();
		const username = formData.get('username')?.toString().trim();
		const password = formData.get('password')?.toString();

		if (!username || !password) {
			return fail(400, { username, error: 'All fields are required.' });
		}

		const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
		if (result.length === 0) {
			return fail(400, { username, error: 'Invalid username or password.' });
		}

		const user = result[0];
		const valid = await verify(user.password_hash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});

		if (!valid) {
			return fail(400, { username, error: 'Invalid username or password.' });
		}

		const token = generateSessionToken();
		const session = await createSession(token, user.id);
		setSessionTokenCookie(cookies, token, session.expires_at);

		return redirect(302, '/auth/redirect-root');
	}
} satisfies Actions;