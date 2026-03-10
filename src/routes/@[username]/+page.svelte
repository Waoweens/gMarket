<script lang="ts">
	import { resolve } from '$app/paths';
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
	import type { PageProps } from './$types';
	import { MailIcon, UserIcon } from '@lucide/svelte';

	let { data }: PageProps = $props();
</script>

<div class="flex flex-col gap-4 card rounded-lg preset-filled-surface-100-900 p-4">
	<div class="flex justify-between">
		<div class="flex items-center gap-2">
			<Avatar class="size-24">
				<Avatar.Fallback>
					<UserIcon size={64} />
				</Avatar.Fallback>
			</Avatar>
			<div class="flex flex-col">
				<p class="text-2xl leading-none font-bold">
					{data.profile.displayName ?? data.profile.username}
				</p>
				<p class="leading-none">@{data.profile?.username}</p>
				<div class="mt-2 flex">
					<button class="btn preset-filled">
						<MailIcon size={16} />
						<span>Chat</span>
					</button>
				</div>
			</div>
		</div>
		<div class="mr-4 flex items-center">
			{#if data.profile.id === data.user?.id}
				<a
					class="btn preset-filled"
					href={resolve('/@[username]/edit', { username: data.user.username })}>Edit profile</a
				>
			{/if}
		</div>
	</div>
	{#if data.profile.bio}
		<div>
			<p>{data.profile.bio}</p>
		</div>
	{/if}
</div>
