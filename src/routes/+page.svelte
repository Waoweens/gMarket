<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1 class="mb-4 text-2xl font-bold">Recently posted products</h1>
<div class="gap-4 sm:flex sm:flex-wrap max-sm:grid max-sm:grid-cols-2">
	{#each data.products as product (product.id)}
		<ProductCard {product} />
	{/each}
</div>
