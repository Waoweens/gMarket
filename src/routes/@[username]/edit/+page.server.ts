import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
	const profile = await db.query.users.findFirst({
		where: eq(users.username, params.username)
	});

	if (!profile) {
		error(404, `User not found: ${params.username}`);
	}

	if (profile.id !== locals.user?.id) {
		error(403, 'You are not authorized to edit this profile.');
	}

	return {
		editProfile: profile
	}
};

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const id = form.get('id')?.toString();
		const username = form.get('username')?.toString().trim();
		const displayName = form.get('displayName')?.toString().trim();
		const bio = form.get('bio')?.toString().trim();
		//const currentPassword = form.get('currentPassword')?.toString();
		//const newPassword = form.get('newPassword')?.toString();
		//const confirmNewPassword = form.get('confirmNewPassword')?.toString();

		if (!username) return fail(400, { error: 'Username is required.' });
		if (!/^[a-z][a-z0-9._]{2,19}$/.test(username))
			return fail(400, {
				error:
					'Username must be 3-20 characters, start with a letter, and can only contain lowercase letters, numbers, underscores, and periods.'
			});

		const newDisplayName: string | null = displayName || null;
		const newBio: string | null = bio || null;

		await db
			.update(users)
			.set({ username, displayName: newDisplayName, bio: newBio })
			.where(eq(users.id, BigInt(id!)));

		return redirect(302, `/@${username}`);
	}
} satisfies Actions;
