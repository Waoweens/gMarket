import { db } from "$lib/server/db";
import { and, desc, eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { products } from "$lib/server/db/schema";

export const load: PageServerLoad = async ({ parent }) => {
	const { profile } = await parent();
	const productsList = await db.query.products.findMany({
		where: and(
			eq(products.created, true),
			eq(products.userId, profile.id)
		),
		orderBy: [desc(products.id)],
		with: {
			user: true
		}
	});

	return {
		products: productsList
	}
};