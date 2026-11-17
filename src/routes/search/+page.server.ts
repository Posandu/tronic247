import { formaRawPostModule } from '#lib/posts.ts';
import { getImportedPosts } from '#lib/server/allPosts.ts';

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
