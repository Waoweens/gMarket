<script lang="ts">
	import type { PageProps } from './$types';
	import UserCard from '$lib/components/UserCard.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';

	let { data }: PageProps = $props();
</script>


<UserCard profile={data.profile} user={data.user} />
<h1 class="text-2xl font-bold my-4">Recently posted products</h1>
<div class="gap-4 sm:flex sm:flex-wrap max-sm:grid max-sm:grid-cols-2">
	{#each data.products as product (product.id)}
		<ProductCard {product} />
	{/each}
</div>
