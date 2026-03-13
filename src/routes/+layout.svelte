<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { AppBar, Menu, Portal } from '@skeletonlabs/skeleton-svelte';
	import { resolve } from '$app/paths';
	import {
		BellIcon,
		CircleUserIcon,
		LogOutIcon,
		MailIcon,
		SearchIcon,
		ShoppingCartIcon
	} from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { dev } from '$app/environment';
	import SearchBox from '$lib/components/SearchBox.svelte';
	import { page } from '$app/state';

	let { children, data } = $props();

	const commit = __COMMIT_HASH__;
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="flex flex-col w-full h-dvh min-h-0 items-center">
	<header class="w-full sticky top-0 z-10">
		<AppBar>
			<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
				<AppBar.Lead class="sm:pr-2 pl-2">
					<a class="text-xl font-bold" href={resolve('/')}>gMarket</a>
				</AppBar.Lead>
				<AppBar.Headline class="flex justify-center max-sm:hidden">
					<SearchBox query={data.query} />
				</AppBar.Headline>
				<AppBar.Trail class="flex items-center justify-end gap-0 sm:pr-2">
					{#if data.user}
						<!-- <Menu>
							<Menu.Trigger class="btn-icon hover:preset-tonal data-[state=open]:preset-tonal">
								<span><ShoppingCartIcon /></span>
							</Menu.Trigger>
							<Portal>
								<Menu.Positioner class="z-20!">
									<Menu.Content></Menu.Content>
								</Menu.Positioner>
							</Portal>
						</Menu>
						<Menu>
							<Menu.Trigger class="btn-icon hover:preset-tonal data-[state=open]:preset-tonal">
								<span><BellIcon /></span>
							</Menu.Trigger>
							<Portal>
								<Menu.Positioner class="z-20!">
									<Menu.Content></Menu.Content>
								</Menu.Positioner>
							</Portal>
						</Menu> 
						<Menu>
							<Menu.Trigger class="btn-icon hover:preset-tonal data-[state=open]:preset-tonal">
								<span><MailIcon /></span>
							</Menu.Trigger>
							<Portal>
								<Menu.Positioner class="z-20!">
									<Menu.Content></Menu.Content>
								</Menu.Positioner>
							</Portal> 
						</Menu> -->
						<a class="btn-icon hover:preset-tonal" href={resolve('/messages')}>
							<span><MailIcon /></span>
						</a>
						<Menu>
							<Menu.Trigger class="btn hover:preset-tonal data-[state=open]:preset-tonal pr-0">
								<CircleUserIcon size={24} />
								<span class="">{data.user.displayName ?? data.user.username}</span>
							</Menu.Trigger>
							<Portal>
								<Menu.Positioner class="z-20!">
									<Menu.Content>
										<Menu.Item value="test">
											{#snippet element(attributes)}
												<a
													{...attributes as HTMLAnchorAttributes}
													href={resolve('/@[username]', { username: data.user!.username })}>
													<Menu.ItemText class="flex items-center gap-2">
														<CircleUserIcon size={20} />
														<span>Profile</span>
													</Menu.ItemText>
												</a>
											{/snippet}
										</Menu.Item>
										<Menu.Item value="logout">
											{#snippet element(attributes)}
												<form class="contents" use:enhance method="post" action="/auth/logout">
													<button {...attributes as HTMLButtonAttributes} type="submit">
														<Menu.ItemText class="flex items-center gap-2">
															<LogOutIcon size={20} />
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

			<AppBar.Headline class="sm:hidden">
				<SearchBox query={data.query} />
			</AppBar.Headline>
		</AppBar>
	</header>
	<main class="w-full max-w-7xl grow p-4 flex flex-col" class:min-h-0={page.route.id === '/messages/@[username]'}>
		{@render children()}
	</main>
	<footer class="w-full p-4 preset-filled-surface-100-900">
		<p>build: {dev ? 'development' : 'production'}@<a class="underline" href="https://github.com/Waoweens/gMarket/commit/{commit}">{commit}</a></p>
		<noscript><p>JavaScript disabled. Some functionality may not work as expected.</p></noscript>
	</footer>
</div>
