import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { writeFile } from 'node:fs/promises';
import { IMAGE_UPLOAD_PATH, IMAGE_UPLOAD_URL } from '$env/static/private';
import { db } from '$lib/server/db';
import { products } from '$lib/server/db/schema';
import { snowflake } from '$lib';
import { eq } from 'drizzle-orm';
import sharp from 'sharp';

export const load: PageServerLoad = async ({ locals, parent, params }) => {
	const { profile } = await parent();
	const { productId } = params;

	if (profile.id !== locals.user?.id) {
		error(403, 'You are not authorized to edit a post on this profile.');
	}

	const product = await db.query.products.findFirst({
		where: eq(products.id, BigInt(productId))
	});

	if (!product) {
		error(404, 'Product not found.');
	}

	return {
		editProduct: product
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const userId = form.get('userId')?.toString().trim();
		const username = form.get('username')?.toString().trim();
		const productId = form.get('productId')?.toString().trim();
		const title = form.get('title')?.toString().trim();
		const description = form.get('description')?.toString().trim();
		const image = form.get('image') as File | null;
		const priceStr = form.get('price')?.toString().trim();

		if (!userId) return fail(400, { error: 'User ID is required.' });
		if (!username) return fail(400, { error: 'Username is required.' });
		if (!productId) return fail(400, { error: 'Product ID is required.' });
		if (!title) return fail(400, { error: 'Title is required.' });
		if (!priceStr) return fail(400, { error: 'Price is required.' });

		const price = BigInt(priceStr);

		if (price < 0n) return fail(400, { error: 'Price cannot be negative.' });

		const hasNewImage = image && image.size > 0;

		const imageId = hasNewImage ? snowflake.generate() : null;
		const imageName = hasNewImage ? `${userId}-${productId}-${imageId}.png` : null;

		if (hasNewImage) {
			const inputBuffer = Buffer.from(await image.arrayBuffer());
			const outputBuffer = await sharp(inputBuffer, { failOn: 'none' })
				.rotate() // auto-rotate based on EXIF data
				.resize(1024, 1024, { fit: 'cover', position: 'center' })
				.png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
				.toBuffer();
			await writeFile(IMAGE_UPLOAD_PATH + `/${imageName}`, outputBuffer);
		}

		const existingProduct = await db.query.products.findFirst({
			where: eq(products.id, BigInt(productId))
		});

		if (existingProduct) {
			await db
				.update(products)
				.set({
					title,
					description,
					imageUrl: hasNewImage ? `${IMAGE_UPLOAD_URL}/${imageName}` : existingProduct.imageUrl,
					price,
					created: true
				})
				.where(eq(products.id, BigInt(productId)));
		} else {
			return fail(404, { error: 'Product not found.' });
		}

		return redirect(302, `/@${username}/product/${productId}`);
	}
} satisfies Actions;
