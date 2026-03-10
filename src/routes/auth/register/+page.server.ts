import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import { eq } from 'drizzle-orm';
import type { Actions } from "./$types";
import { snowflake } from "$lib";
import { hash } from "@node-rs/argon2";
import { createSession, generateSessionToken, setSessionTokenCookie } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = formData.get('username')?.toString().trim();
		const password = formData.get('password')?.toString();
		const confirmPassword = formData.get('confirmPassword')?.toString();

		if (!username || !password || !confirmPassword) {
			return fail(400, { username, error: 'All fields are required.' });
		}

		if (!/^[a-z][a-z0-9._]{2,19}$/.test(username)) {
			return fail(400, { username, error: 'Username must be 3-20 characters, start with a letter, and can only contain lowercase letters, numbers, underscores, and periods.' });
		}

		if (password !== confirmPassword) {
			return fail(400, { username, error: 'Passwords do not match.' });
		}

		const existingUser = await db.select().from(users).where(eq(users.username, username));
		if (existingUser.length > 0) {
			return fail(400, { username, error: 'Username is already taken.' });
		}

		const userId = snowflake.generate();
		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});

		await db.insert(users).values({
			id: userId,
			username,
			passwordHash: passwordHash
		});

		const token = generateSessionToken();
		const session = await createSession(token, userId);
		setSessionTokenCookie(cookies, token, session.expiresAt);

		return redirect(302, `/@${username}/edit`);
	}
} satisfies Actions;