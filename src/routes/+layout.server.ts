import { formaRawPostModule, getImportedPosts, getStats } from '$lib/posts';

export const load = async ({ url }) => {
	const allPosts = await getImportedPosts();
	const allPostsFormatted = Object.entries(allPosts).map(([path, post]) =>
		formaRawPostModule(post, path)
	);

	const allImgs = import.meta.glob('../../static/**/*.{jpg,jpeg,png,webp}', {
		query: {
			enhanced: true
		},
		eager: true
	});

	const stats = getStats(allPostsFormatted);
	const isArchivePage =
		url.pathname.includes('/archive') ||
		url.pathname === '/' ||
		url.pathname.includes('/category/') ||
		url.pathname.includes('/tag/');

	let newImgs: any = {};

	for (const key in allImgs) {
		const img: any = allImgs[key];
		newImgs[key.replace('../../static', '')] = img.default;
	}

	return {
		allPostsFormatted: isArchivePage
			? allPostsFormatted.map((post) => ({
					...post,
					content: undefined
				}))
			: null,
		stats,
		url: url.pathname,
		allImgs: newImgs
	};
};
