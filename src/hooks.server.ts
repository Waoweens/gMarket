import { deleteSessionTokenCookie, setSessionTokenCookie, validateSession } from "$lib/server/auth";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session') ?? null;

	if (token === null) {
		console.log('Hook: No session token found in cookies.');
		event.locals.user = null;
		event.locals.session = null;
		return await resolve(event);
	}

	const { session, user } = await validateSession(token);
	if (session !== null) {
		console.log(`Hook: Valid session found for user ${user.username}.`);
		setSessionTokenCookie(event.cookies, token, session.expires_at);
	} else {
		console.log('Hook: Invalid session token. Deleting cookie.', token);
		deleteSessionTokenCookie(event.cookies);
	}

	event.locals.user = user;
	event.locals.session = session;

	return await resolve(event);

};