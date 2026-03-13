<script lang="ts">
	import ProductsList from '$lib/components/ProductsList.svelte';

	let { data } = $props();
</script>

<h1 class="text-lg font-bold">Search: {data.query}</h1>
<p class="mb-4">{data.results?.length || 0} results found.</p>
<ProductsList products={data.results} />