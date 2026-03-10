<script lang="ts">
	let { children } = $props()
</script>

<section class="h-full flex justify-center items-center w-full p-10">
	<div class="w-full max-w-xl">
		{@render children()}
	</div>
</section>