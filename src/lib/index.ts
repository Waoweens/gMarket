import type { NewProduct, User } from "./server/db/schema";
import SnowflakeGenerator from "./snowflake";

// place files you want to import through the `$lib` alias in this folder.
export const snowflake = new SnowflakeGenerator(67);

export const emptyUser = (): User => {
	return {
		id: 0n,
		username: '',
		passwordHash: '',
		displayName: '',
		bio: ''
	}
}

export const emptyProduct = (productId: bigint, userId: bigint): NewProduct => {
	return {
		id: productId,
		userId: userId,
		title: '',
		description: null,
		imageUrl: null,
		price: 0n,
		// createdAt has default
		// created has default
	}
}