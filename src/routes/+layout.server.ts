import { formaRawPostModule, getImportedPosts, getStats } from '$lib/posts';

export const load = async ({ url }) => {
	const allPosts = await getImportedPosts();
	const allPostsFormatted = Object.entries(allPosts).map(([path, post]) =>
		formaRawPostModule(post, path)
	);

	const stats = getStats(allPostsFormatted);
	const isArchivePage =
		url.pathname.includes('/archive') ||
		url.pathname === '/' ||
		url.pathname.includes('/category/') ||
		url.pathname.includes('/tag/');

	return {
		allPostsFormatted: isArchivePage
			? allPostsFormatted.map((post) => ({
					...post,
					content: undefined
				}))
			: null,
		stats,
		url: url.pathname
	};
};
