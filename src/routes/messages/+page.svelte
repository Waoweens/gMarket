<script lang="ts">
	import { resolve } from '$app/paths';
	import { UserIcon } from '@lucide/svelte';
	import { Avatar } from '@skeletonlabs/skeleton-svelte';

	const { data } = $props();
</script>

<h1 class="text-2xl font-bold mb-2">Messages</h1>
{#each data.conversations as conversation (conversation.id)}
	{#if conversation.id !== data.user?.id}
		<a
			href={resolve('/messages/@[username]', { username: conversation.username })}
			class="flex items-center gap-4 card border preset-filled-surface-100-900 p-4"
		>
			<Avatar class="size-12">
				<Avatar.Fallback>
					<UserIcon size={32} />
				</Avatar.Fallback>
			</Avatar>
			<div class="flex flex-col">
				<p class="text-xl leading-none font-bold">
					{conversation.displayName ?? conversation.username}
				</p>
				<p class="text-sm leading-none">@{conversation.username}</p>
			</div>
		</a>
	{/if}
{/each}
