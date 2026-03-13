<script lang="ts">
	import UserCard from '$lib/components/UserCard.svelte';
	import { MailIcon, PencilIcon } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';

	let { data }: PageProps = $props();

	let quantity = $state(1);
</script>

<div class="flex max-md:flex-col w-full gap-4">
	<div class="md:max-w-72 max-md:max-w-96 self-center">
		<img
			src={data.product.imageUrl}
			alt={data.product.title}
			class="aspect-square w-full rounded-lg object-cover"
		/>
	</div>
	<div class="md:grow flex flex-col gap-2">
		<h1 class="font-bold text-3xl">{data.product.title}</h1>
		<p class="text-xl font-bold">Rp {data.product.price.toLocaleString('id-ID')}</p>
		<p class="whitespace-pre-line border-l-4 pl-4 py-2">{data.product.description}</p>
		{#if data.user?.id === data.profile.id}
			<a href={resolve('/@[username]/product/[productId]/edit', { username: data.profile.username, productId: data.product.id.toString() })} class="btn preset-filled w-max">
				<PencilIcon size={16} />
				<span>Edit Product</span>
			</a>
		{/if}
	</div>
	<div class="md:w-72 ">
		<div class="w-full md:self-start card preset-filled-surface-100-900 rounded-lg p-4">
			<form use:enhance method="post" class="flex flex-col gap-2">
				<input type="hidden" name="productId" value={data.product.id} />
				<input type="hidden" name="userId" value={data.user?.id ?? ''} />

				<label class="label">
					<span class="label-text">Quantity:</span>
					<input class="input" type="number" pattern="[0-9]*" name="quantity" min="1" bind:value={quantity} required />
				</label>
				<p class="text-lg">Subtotal: <span class="font-bold">Rp {(BigInt(quantity) * data.product.price).toLocaleString('id-ID')}</span></p>
				<!-- <button class="btn preset-filled-primary-500" type="submit">
					<PlusIcon size={16} />
					<span>Add to cart</span>
				</button> -->
			</form>
			<a href={resolve('/messages/@[username]', { username: data.profile.username })} class="btn preset-filled w-full mt-4">
				<MailIcon size={16} />
				<span>Chat seller</span>
			</a>
		</div>
	</div>
</div>

<h2 class="text-lg font-bold mt-4">About this seller</h2>
<UserCard user={data.user} profile={data.profile} />