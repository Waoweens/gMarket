<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#if data.user}
	<p>Logged in as {data.user.username}</p>
	<form use:enhance method="post" action="/auth/logout">
		<button type="submit">Logout</button>
	</form>
{:else}
	<p>You are not logged in.</p>
	<a href={resolve('/auth/login')}>Login</a>
	<a href={resolve('/auth/register')}>Register</a>
{/if}