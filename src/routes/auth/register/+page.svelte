<script lang="ts">
	import { enhance } from "$app/forms";
	import { resolve } from "$app/paths";
	import type { PageProps } from "./$types";
	
	let { form }: PageProps = $props();
</script>

<form use:enhance method="post" class="flex flex-col items-center gap-4">
	<h2 class="h2">Register</h2>

	<fieldset class="w-full flex flex-col items-center gap-4">
		<label class="label">
			<span class="label-text">Username:</span>
			<input class="input" type="text" autocomplete="username" name="username" value={form?.username ?? ''} pattern="^[a-z][a-z0-9._]{'{'}2,19}$" required />
			<span class="label-text">3-20 characters, lowercase alphanumeric, underscore _, period ., must start with a letter.</span>
		</label>
		<label class="label">
			<span class="label-text">Password:</span>
			<input class="input" type="password" autocomplete="new-password" name="password" required />
		</label>
		<label class="label">
			<span class="label-text">Confirm Password:</span>
			<input class="input" type="password" autocomplete="new-password" name="confirmPassword" required />
		</label>
		<button class="btn preset-filled w-full" type="submit">Register</button>
		<p>Already have an account? <a class="underline" href={resolve('/auth/login')}>Log in</a></p>
	</fieldset>

	{#if form?.error}
		<p class="text-red-500">{form.error}</p>
	{/if}

</form>