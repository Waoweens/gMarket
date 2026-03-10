<script lang="ts">
	import { enhance } from "$app/forms";
	import { resolve } from "$app/paths";
	import type { PageProps } from "./$types";
	
	let { form }: PageProps = $props();
</script>

<form use:enhance method="post" class="flex flex-col items-center gap-4">
	<h2 class="h2">Log in</h2>

	<fieldset class="w-full flex flex-col items-center gap-4">
		<label class="label">
			<span class="label-text">Username:</span>
			<input class="input" type="text" autocomplete="username" name="username" value={form?.username ?? ''} required />
		</label>
		<label class="label">
			<span class="label-text">Password:</span>
			<input class="input" type="password" autocomplete="current-password" name="password" required />
		</label>
		<button class="btn preset-filled w-full" type="submit">Log in</button>
		<p>Don't have an account? <a class="underline" href={resolve('/auth/register')}>Register</a></p>
	</fieldset>

	{#if form?.error}
		<p class="text-red-500">{form.error}</p>
	{/if}

</form>