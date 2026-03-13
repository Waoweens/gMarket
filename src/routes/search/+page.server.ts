import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { and, desc, eq, sql } from 'drizzle-orm';
import { products, users } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {
	const { query } = await parent();

	if (!query) redirect(302, '/')

	const q = query.trim();

	const results = await db.transaction(async (tx) => {
		await tx.execute(sql`SET LOCAL pg_trgm.similarity_threshold = 0.12;`);

		const titleText = products.title;
		const descText = sql<string>`coalesce(${products.description}, '')`;

		const titleScore = sql<number>`similarity(${titleText}, ${q})`;
		const descScore = sql<number>`similarity(${descText}, ${q})`;

		// boost exact contains so "printer" in description always surfaces
		const exactBoost = sql<number>`
			(CASE WHEN ${titleText} ILIKE ${'%' + q + '%'} THEN 1.0 ELSE 0 END) +
			(CASE WHEN ${descText}  ILIKE ${'%' + q + '%'} THEN 0.6 ELSE 0 END)
    	`;

		const rank = sql<number>`
			(${exactBoost} * 2.0) + (${titleScore} * 0.7 + ${descScore} * 0.3)
		`;

		return tx
			.select({
				id: products.id,
				title: products.title,
				description: products.description,
				imageUrl: products.imageUrl,
				price: products.price,
				createdAt: products.createdAt,
				created: products.created,
				rank,
				user: {
					id: users.id,
					username: users.username
				}
			})
			.from(products)
			.innerJoin(users, eq(products.userId, users.id))
			.where(
				and(
					eq(products.created, true),
					// IMPORTANT: exact contains OR trigram
					sql`(
						${titleText} ILIKE ${'%' + q + '%'}
						OR ${descText} ILIKE ${'%' + q + '%'}
						OR ${titleText} % ${q}
						OR ${descText} % ${q}
					)`
				)
			)
			.orderBy(desc(rank), desc(products.createdAt));
	});

	return {
		results
	};
};
