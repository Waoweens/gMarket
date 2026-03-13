<script lang="ts">
	import { resolve } from "$app/paths";
	// import { emptyUser } from "$lib";
	import type { User } from "$lib/server/db/schema";
	import { MailIcon, PlusIcon, UserIcon, UserPenIcon } from "@lucide/svelte";
	import { Avatar } from "@skeletonlabs/skeleton-svelte";

	let { profile, user }: { profile: User; user: User | null } = $props();
</script>

<div class="flex flex-col gap-4 card rounded-lg preset-filled-surface-100-900 p-4">
	<div class="flex max-sm:flex-col sm:justify-between max-sm:gap-2">
		<div class="flex items-center gap-2">
			<Avatar class="size-24">
				<Avatar.Fallback>
					<UserIcon size={64} />
				</Avatar.Fallback>
			</Avatar>
			<div class="flex flex-col">
				<p class="text-2xl leading-none font-bold">
					{profile.displayName ?? profile.username}
				</p>
				<p class="leading-none">@{profile?.username}</p>
				<div class="mt-2 flex">
					<button class="btn preset-filled">
						<MailIcon size={16} />
						<span>Chat</span>
					</button>
				</div>
			</div>
		</div>
		<div class="mr-4 flex sm:flex-col sm:justify-center gap-2">
			{#if profile.id === user?.id}
				<a
					class="btn preset-filled"
					href={resolve('/@[username]/edit', { username: profile.username })}>
					<UserPenIcon size={16} />
					<span>Edit profile</span>
				</a>
				<a
					class="btn preset-filled"
					href={resolve('/@[username]/product/new', { username: profile.username })}>
					<PlusIcon size={16} />
					<span>New product</span>
				</a>
			{/if}
		</div>
	</div>
	{#if profile.bio}
		<div>
			<p>{profile.bio}</p>
		</div>
	{/if}
</div>