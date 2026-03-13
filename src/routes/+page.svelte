<script lang="ts">
	import ProductsList from '$lib/components/ProductsList.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1 class="mb-4 text-2xl font-bold">Recently posted products</h1>
<ProductsList products={data.products} />
