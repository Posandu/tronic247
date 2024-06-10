import { formaRawPostModule, getImportedPosts, getStats } from '$lib/posts';

export const load = async ({ url }) => {
	const allPosts = await getImportedPosts();
	const allPostsFormatted = Object.entries(allPosts).map(([path, post]) =>
		formaRawPostModule(post, path)
	);

	const stats = getStats(allPostsFormatted);

	return {
		allPostsFormatted: allPostsFormatted.map((post) => ({
			...post,
			content: undefined
		})),
		stats,
		url: url.pathname
	};
};
