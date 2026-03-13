import { or, eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { messages, users } from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ locals }) => {
	const userId = locals.user?.id;
	if (!userId) return { conversations: [] };

	const participants = db
		.selectDistinct({
			participantId: sql<bigint>`
				case
					when ${messages.senderId} = ${userId} then ${messages.receiverId}
					else ${messages.senderId}
				end
			`.as('participant_id')
		})
		.from(messages)
		.where(or(eq(messages.senderId, userId), eq(messages.receiverId, userId)))
		.as('participants');

	const conversations = await db
		.select({ user: users })
		.from(users)
		.innerJoin(
			participants,
			sql`${users.id} = ${participants.participantId}`
		);

	return {
		conversations: conversations.map((c) => c.user)
	};
};