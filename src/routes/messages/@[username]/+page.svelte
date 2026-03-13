<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { ArrowLeftIcon, SendIcon, UserIcon } from '@lucide/svelte';
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
	import { onMount } from 'svelte';

	const { data } = $props();

	let inputEl: HTMLInputElement;

	onMount(() => {
		const interval = setInterval(() => {
			invalidateAll();
		}, 2000);
		return () => clearInterval(interval);
	});
</script>

<article class="flex h-full min-h-0 w-full grow flex-col rounded-lg bg-surface-100-900">
	<header class="flex items-center gap-2 border-b p-2">
		<button class="btn-icon preset-tonal-surface-100-900" onclick={() => history.back()}>
			<ArrowLeftIcon size={24} />
		</button>
		<Avatar class="size-12">
			<Avatar.Fallback>
				<UserIcon size={32} />
			</Avatar.Fallback>
		</Avatar>
		<div class="flex flex-col">
			<p class="text-xl leading-none font-bold">
				{data.recipient.displayName ?? data.recipient.username}
			</p>
			<p class="text-sm leading-none">@{data.recipient?.username}</p>
		</div>
	</header>
	<main class="flex grow min-h-0 flex-col gap-2 overflow-y-auto p-4">
		{#each data.messages as message (message.id)}
			<div
				class="card p-2"
				class:preset-filled-surface-300-700={message.senderId === data.user!.id}
				class:self-end={message.senderId === data.user!.id}
				class:preset-filled-primary-100-900={message.senderId !== data.user!.id}
				class:self-start={message.senderId !== data.user!.id}
			>
				<p>{message.content}</p>
			</div>
		{/each}
	</main>
	<footer class="border-t p-2">
		<form use:enhance={() => {
			return async ({ update }) => {
				await update();
				inputEl.focus();
			}
		}} method="post">
			<input type="hidden" name="recipientId" value={data.recipient.id} />
			<div class="input-group grid-cols-[1fr_auto]">
				<input
					bind:this={inputEl}
					class="input"
					type="text"
					name="content"
					placeholder="Type your message..."
					required
				/>
				<button class="ig-btn preset-filled" type="submit">
					<SendIcon size={16} />
				</button>
			</div>
		</form>
	</footer>
</article>
