<script lang="ts">
	import type { PageProps } from './$types';
	import UserCard from '$lib/components/UserCard.svelte';
	import ProductsList from '$lib/components/ProductsList.svelte';

	let { data }: PageProps = $props();
</script>


<UserCard profile={data.profile} user={data.user} />
<h1 class="text-2xl font-bold my-4">Recently posted products</h1>
<ProductsList products={data.products} />
