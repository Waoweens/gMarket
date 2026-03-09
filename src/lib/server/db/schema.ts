import { pgTable, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	username: text().notNull()
});

export const sessions = pgTable('sessions', {
	id: text().notNull().primaryKey(),
	user_id: integer()
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