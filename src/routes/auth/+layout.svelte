<script lang="ts">
	let { children } = $props()
</script>

<section class="h-full flex justify-center items-center w-full max-w-110 p-10">
	{@render children()}
</section>