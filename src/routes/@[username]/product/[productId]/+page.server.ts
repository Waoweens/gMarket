import { db } from "$lib/server/db";
import { products } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
	const { productId } = params;

	const product = await db.query.products.findFirst({
		where: eq(products.id, BigInt(productId))
	});

	if (!product) return error(404, 'Product not found.');

	return {
		product
	}
}