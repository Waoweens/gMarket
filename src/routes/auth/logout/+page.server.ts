import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { deleteSessionTokenCookie, invalidateSession } from "$lib/server/auth";

export const actions = {
	default: async ({ locals, cookies }) => {
		if (!locals.session) return fail(401);

		await invalidateSession(locals.session.id);
		deleteSessionTokenCookie(cookies);
		redirect(302, '/auth/redirect-root');
	}
} satisfies Actions