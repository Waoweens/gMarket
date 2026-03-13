import { db } from "$lib/server/db";
import { desc, eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { products } from "$lib/server/db/schema";

export const load: PageServerLoad = async () => {
	const productsList = await db.query.products.findMany({
		where: eq(products.created, true),
		orderBy: [desc(products.id)],
		with: {
			user: true
		}
	});

	return {
		products: productsList
	}
};