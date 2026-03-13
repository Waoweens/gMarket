import { db } from "$lib/server/db";
import { and, asc, eq, or } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";
import { messages, users } from "$lib/server/db/schema";
import { error, redirect } from "@sveltejs/kit";
import { snowflake } from "$lib";

export const load: PageServerLoad = async ({ params, locals }) => {
	const { username } = params;

	if (locals.user?.username === username) redirect(302, "/messages");

	const recipient = await db.query.users.findFirst({
		where: eq(users.username, username)
	});

	if (!recipient) error(404, "User not found");

	const messageList = await db.query.messages.findMany({
		where: or(
			and(
				eq(messages.senderId, locals.user!.id),
				eq(messages.receiverId, recipient.id)
			),
			and(
				eq(messages.senderId, recipient.id),
				eq(messages.receiverId, locals.user!.id)
			)
		),
		orderBy: [asc(messages.createdAt)]
	});

	return {
		recipient,
		messages: messageList
	};
}

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const recipientId = formData.get("recipientId");
		const content = formData.get("content");

		if (typeof recipientId !== "string" || typeof content !== "string") {
			error(400, "Invalid form data");
		}

		await db.insert(messages).values({
			id: snowflake.generate(),
			senderId: locals.user!.id,
			receiverId: BigInt(recipientId),
			content
		});

	}
} satisfies Actions;