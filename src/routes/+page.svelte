<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1 class="mb-4 text-2xl font-bold">Recently posted products</h1>
<div class="flex gap-4 flex-wrap">
	{#each data.products as product (product.id)}
		<ProductCard {product} />
	{/each}
</div>
