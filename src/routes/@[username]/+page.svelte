<script lang="ts">
	import type { PageProps } from './$types';
	import UserCard from '$lib/components/UserCard.svelte';

	let { data }: PageProps = $props();
</script>


<UserCard profile={data.profile} user={data.user} />