import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const query = url.searchParams.get("q") || "";
	return {
		user: locals.user,
		query,
	};
};