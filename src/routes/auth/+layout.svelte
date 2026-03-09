<script lang="ts">
	let { children } = $props()
</script>

<div class="h-full flex justify-center items-center">
	<section class="w-96 p-10">
		{@render children()}
	</section>
</div>