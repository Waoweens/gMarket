<script lang="ts">
	import { enhance } from '$app/forms';
	import { PlusIcon } from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { form, data }: PageProps = $props();

	let imageSrc = $derived(data.editProduct?.imageUrl ?? '')

	function previewImage(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const file = input.files[0];
			imageSrc = URL.createObjectURL(file);
		}
	}
</script>

<form
	use:enhance
	enctype="multipart/form-data"
	method="post"
	class="flex w-full max-w-xl flex-col gap-4"
>
	<h2 class="h2">Edit Product</h2>
	<input type="hidden" name="userId" value={data.profile.id} />
	<input type="hidden" name="username" value={data.profile.username} />
	<input type="hidden" name="productId" value={data.editProduct?.id} />

	<fieldset class="flex w-full flex-col gap-4">
		{#if imageSrc}
			<div class="flex max-w-64">
				<img src={imageSrc} alt="Cover" class="w-full object-cover aspect-square" />
			</div>
		{/if}
		<label class="label">
			<span class="label-text">Image:</span>
			<input class="input" type="file" name="image" accept="image/*" onchange={previewImage} />
		</label>

		<label class="label">
			<span class="label-text">Title:</span>
			<input class="input" type="text" name="title" value={data.editProduct?.title ?? ''} required />
		</label>

		<label class="label">
			<span class="label-text">Description:</span>
			<textarea class="input" name="description" rows={4} value={data.editProduct?.description ?? ''} required></textarea>
		</label>

		<label class="label">
			<span class="label-text">Price:</span>
			<div class="input-group grid-cols-[auto_1fr_auto]">
				<div class="ig-cell preset-tonal">
					<span>Rp</span>
				</div>
				<input class="input" type="number" name="price" min="0" step="1" value={data.editProduct?.price ?? 0} required />
			</div>
		</label>

		<button class="btn preset-filled" type="submit">
			<PlusIcon size={16} />
			<span>Submit Product</span>
		</button>
	</fieldset>

	{#if form?.error}
		<p class="text-red-500">{form.error}</p>
	{/if}
</form>
