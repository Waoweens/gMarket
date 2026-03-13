<script lang="ts">
	import { resolve } from "$app/paths";
	import type { Product, User } from "$lib/server/db/schema";

	let { product }: { product: Product & { user: User } } = $props();
</script>

<div class="flex w-56 card preset-filled-surface-100-900 p-4">
	<a
		href={resolve('/@[username]/product/[productId]', {
			username: product.user.username,
			productId: product.id.toString()
		})}
		class="card-link flex flex-col"
	>
		<div class="mb-4 w-full">
			<img src={product.imageUrl} alt={product.title} class="rounded-lg" />
		</div>
		<h2 class="card-title font-bold">{product.title}</h2>
		<p class="card-price">Rp {product.price.toLocaleString('id-ID')}</p>
	</a>
</div>
