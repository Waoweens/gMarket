<script lang="ts">
	import { SearchIcon } from '@lucide/svelte';

	let { query } = $props();
</script>

<form class="w-full" method="get" action="/search">
	<div class="input-group grid-cols-[1fr_auto]">
		<input class="ig-input" type="text" name="q" placeholder="Search..." value={query} />
		<button class="ig-btn preset-filled" type="submit">
			<SearchIcon size={16} />
		</button>
	</div>
</form>
