<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1 class="mb-4 text-2xl font-bold">Recently posted products</h1>
<div class="flex gap-4">
	{#each data.products as product (product.id)}
		<div class="flex card preset-filled-surface-100-900 p-4 w-56">
			<a
				href={resolve('/@[username]/product/[productId]', {
					username: product.user.username,
					productId: product.id.toString()
				})}
				class="card-link flex flex-col"
			>
				<div class="mb-4 w-full">
					<img src={product.imageUrl} alt={product.title} class="rounded-lg" />
				</div>
				<h2 class="card-title font-bold">{product.title}</h2>
				<p class="card-price">Rp {product.price.toLocaleString('id-ID')}</p>
			</a>
		</div>
	{/each}
</div>
