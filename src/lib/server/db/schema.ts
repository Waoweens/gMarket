import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, bigint, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: bigint({ mode: 'bigint' }).primaryKey(),
	username: text().notNull(),
	passwordHash: text().notNull(),

	displayName: text(),
	bio: text()
});

export const sessions = pgTable('sessions', {
	id: text().notNull().primaryKey(),
	userId: bigint({ mode: 'bigint' })
		.notNull()
		.references(() => users.id, {
			onDelete: 'cascade'
		}),
	expiresAt: timestamp({
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const products = pgTable('products', {
	id: bigint({ mode: 'bigint' }).primaryKey(),
	userId: bigint({ mode: 'bigint' })
		.notNull()
		.references(() => users.id, {
			onDelete: 'cascade'
		}),
	title: text().notNull(),
	description: text(),
	imageUrl: text(),
	price: bigint({ mode: 'bigint' }).notNull(),
	createdAt: timestamp({
		withTimezone: true,
		mode: 'date'
	}).default(sql`now()`).notNull(),
	created: boolean().default(false).notNull()
});

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;