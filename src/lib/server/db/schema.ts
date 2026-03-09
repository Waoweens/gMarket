import { pgTable, text, timestamp, bigint } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: bigint({ mode: 'bigint' }).primaryKey(),
	username: text().notNull(),
	password_hash: text().notNull()
});

export const sessions = pgTable('sessions', {
	id: text().notNull().primaryKey(),
	user_id: bigint({ mode: 'bigint' })
		.notNull()
		.references(() => users.id, {
			onDelete: 'cascade'
		}),
	expires_at: timestamp({
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;