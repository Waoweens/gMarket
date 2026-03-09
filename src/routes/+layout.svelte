<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { AppBar, Menu, Portal } from '@skeletonlabs/skeleton-svelte';
	import { resolve } from '$app/paths';
	import { BellIcon, CircleUserIcon, LogOutIcon, MailIcon, SearchIcon, ShoppingCartIcon, UserIcon } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	let { children, data } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header>
	<AppBar>
		<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
			<AppBar.Lead class="pl-2 pr-2">
				<a class="text-xl font-bold" href={resolve('/')}>gMarket</a>
			</AppBar.Lead>
			<AppBar.Headline class="flex justify-center">
				<form class="w-full" method="get" action="/search">
					<div class="input-group grid-cols-[1fr_auto]">
						<input class="ig-input" type="text" name="q" placeholder="Search..." value={data.query} />
						<button class="ig-btn preset-filled" type="submit">
							<SearchIcon size={16} />
						</button>
					</div>
				</form>
			</AppBar.Headline>
			<AppBar.Trail class="flex justify-end pr-2">
				{#if data.user}
					<Menu>
						<Menu.Trigger class="btn-icon btn-icon-lg hover:preset-tonal data-[state=open]:preset-tonal">
							<ShoppingCartIcon size={24} />
						</Menu.Trigger>
						<Portal>
							<Menu.Positioner>
								<Menu.Content>

								</Menu.Content>
							</Menu.Positioner>
						</Portal>
					</Menu>
					<Menu>
						<Menu.Trigger class="btn-icon btn-icon-lg hover:preset-tonal data-[state=open]:preset-tonal">
							<BellIcon size={24} />
						</Menu.Trigger>
						<Portal>
							<Menu.Positioner>
								<Menu.Content>

								</Menu.Content>
							</Menu.Positioner>
						</Portal>
					</Menu>
					<Menu>
						<Menu.Trigger class="btn-icon btn-icon-lg hover:preset-tonal data-[state=open]:preset-tonal">
							<MailIcon size={24} />
						</Menu.Trigger>
						<Portal>
							<Menu.Positioner>
								<Menu.Content>

								</Menu.Content>
							</Menu.Positioner>
						</Portal>
					</Menu>
					<Menu>
						<Menu.Trigger class="btn hover:preset-tonal data-[state=open]:preset-tonal">
							<CircleUserIcon size={24} />
							<span class="text-lg">{data.user.username}</span>
						</Menu.Trigger>
						<Portal>
							<Menu.Positioner>
								<Menu.Content>
									<Menu.Item value="test">
										{#snippet element(attributes)}
											<a {...(attributes as HTMLAnchorAttributes)} href={resolve(`/profile/${data.user.id}`)}>
												<Menu.ItemText class="flex items-center gap-2">
													<UserIcon size={16} />
													<span>Profile</span>
												</Menu.ItemText>
											</a>
										{/snippet}
									</Menu.Item>
									<Menu.Item value="logout">
										{#snippet element(attributes)}
											<form class="contents" use:enhance method="post" action="/auth/logout">
												<button {...(attributes as HTMLButtonAttributes)} type="submit">
													<Menu.ItemText class="flex items-center gap-2">
														<LogOutIcon size={16} />
														<span>Log out</span>
													</Menu.ItemText>
												</button>
											</form>
										{/snippet}
									</Menu.Item>
								</Menu.Content>
							</Menu.Positioner>
						</Portal>
					</Menu>
				{:else}
					<a class="btn preset-filled" href={resolve('/auth/login')}>Log in</a>
				{/if}
			</AppBar.Trail>
		</AppBar.Toolbar>
	</AppBar>
</header>
<main>
	{@render children()}
</main>
