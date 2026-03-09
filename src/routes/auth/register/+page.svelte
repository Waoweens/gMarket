<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageProps } from "./$types";
	
	let { form }: PageProps = $props();

</script>

<form use:enhance method="post" class="flex flex-col">

	<label for="username">Username:</label>
	<input type="text" autocomplete="username" id="username" name="username" value={form?.username ?? ''} required />

	<label for="password">Password:</label>
	<input type="password" autocomplete="new-password" id="password" name="password" required />

	<label for="confirmPassword">Confirm Password:</label>
	<input type="password" autocomplete="new-password" id="confirmPassword" name="confirmPassword" required />

	{#if form?.error}
		<p class="text-red-500">{form.error}</p>
	{/if}

	<button type="submit">Register</button>
</form>