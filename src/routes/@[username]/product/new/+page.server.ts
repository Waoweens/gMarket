import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { emptyProduct, snowflake } from "$lib";
import { db } from "$lib/server/db";
import { products } from "$lib/server/db/schema";

export const load: PageServerLoad = async ({ locals, parent }) => {
	const { profile } = await parent();

	if (profile.id !== locals.user?.id) {
		error(403, 'You are not authorized to create a post on this profile.');
	}

	// create blank post
	const productId = snowflake.generate();

	await db.insert(products).values(emptyProduct(productId, profile.id));

	return redirect(302, `/@${profile.username}/product/${productId}/edit`);
}