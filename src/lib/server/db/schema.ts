import { pgTable, text, timestamp, bigint } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: bigint({ mode: 'bigint' }).primaryKey(),
	username: text().notNull(),
	passwordHash: text().notNull()
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

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;