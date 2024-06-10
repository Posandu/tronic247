import { formaRawPostModule, getImportedPosts } from '$lib/posts';

export const prerender = true;

export const load = async () => {
	const allPosts = await getImportedPosts();
	const allPostsFormatted = Object.entries(allPosts).map(([path, post]) =>
		formaRawPostModule(post, path)
	);

	return {
		posts: allPostsFormatted.map((post) => ({
			title: post.title,
			slug: post.slug
		}))
	};
};
