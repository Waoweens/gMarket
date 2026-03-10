import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
	const { profile, user } = await parent();

	if (profile.id !== user?.id) {
		error(403, "You are not authorized to edit this profile.");
	}
};

export const actions = {
	
} satisfies Actions;