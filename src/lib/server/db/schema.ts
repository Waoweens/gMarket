import { relations, sql } from 'drizzle-orm';
import { pgTable, text, timestamp, bigint, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: bigint({ mode: 'bigint' }).primaryKey(),
	username: text().notNull(),
	passwordHash: text().notNull(),

	displayName: text(),
	bio: text()
});

export const usersRelations = relations(users, ({ many }) => ({
	products: many(products)
}));

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

export const productsRelations = relations(products, ({ one }) => ({
	user: one(users, {
		fields: [products.userId],
		references: [users.id]
	})
}));

export const messages = pgTable('messages', {
	id: bigint({ mode: 'bigint' }).primaryKey(),
	senderId: bigint({ mode: 'bigint' })
		.notNull()
		.references(() => users.id),
	receiverId: bigint({ mode: 'bigint' })
		.notNull()
		.references(() => users.id),
	content: text().notNull(),
	createdAt: timestamp({
		withTimezone: true,
		mode: 'date'
	}).default(sql`now()`).notNull()
});

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Message = typeof messages.$inferSelect;