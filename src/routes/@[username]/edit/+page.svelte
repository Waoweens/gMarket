<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form, data }: PageProps = $props();
</script>

<section class="flex w-full items-center justify-center">
	<form use:enhance={() => {
		return ({ update }) => {
			update({ reset: false });
		}
	}} method="post" class="flex w-full max-w-xl flex-col gap-4">
		<h2 class="h2">Edit Profile</h2>
		<input type="hidden" name="id" value={data.editProfile!.id} />
		<fieldset class="flex w-full flex-col gap-4">
			<label class="label">
				<span class="label-text">Username:</span>
				<input
					class="input"
					type="text"
					autocomplete="username"
					name="username"
					value={data.editProfile!.username}
					pattern="^[a-z][a-z0-9._]{'{'}2,19}$"
					required
				/>
				<span class="label-text">
					3-20 characters, lowercase alphanumeric, underscore _, period ., must start with a letter.
				</span>
			</label>
			<label class="label">
				<span class="label-text">Display Name:</span>
				<input
					class="input"
					type="text"
					name="displayName"
					value={data.editProfile.displayName ?? ''}
				/>
			</label>
			<label class="label">
				<span class="label-text">Bio:</span>
				<textarea class="input" name="bio" rows={3}>{data.editProfile.bio ?? ''}</textarea>
			</label>

			{#if false}
			<h3 class="h5">Change Password</h3>
			<label class="label">
				<span class="label-text">Current Password:</span>
				<input
					class="input"
					type="password"
					autocomplete="current-password"
					name="currentPassword"
				/>
			</label>
			<label class="label">
				<span class="label-text">New Password:</span>
				<input class="input" type="password" autocomplete="new-password" name="newPassword" />
			</label>
			<label class="label">
				<span class="label-text">Confirm New Password:</span>
				<input
					class="input"
					type="password"
					autocomplete="new-password"
					name="confirmNewPassword"
					
				/>
			</label>
			{/if}
			<button class="btn w-full preset-filled" type="submit">Save Changes</button>
		</fieldset>

		{#if form?.error}
			<p class="text-red-500">{form.error}</p>
		{/if}
	</form>
</section>
