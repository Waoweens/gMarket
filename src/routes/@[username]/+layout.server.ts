import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ params }) => {
	const user = await db.query.users.findFirst({
		where: eq(users.username, params.username),
	});

	if (!user) {
		error(404, `User not found: ${params.username}`);
	}

	return {
		profile: user
	};
}