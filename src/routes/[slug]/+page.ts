import { formaRawPostModule, getImportedPosts } from '$lib/posts';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const slug = params.slug;
	const post = await import(`../../../posts/${slug}/index.md`);
	const path = `../../../posts/${slug}/index.md`;
	const allPosts = await getImportedPosts();
	const allPostsFormatted = Object.entries(allPosts)
		.map(([path, post]) => ({
			...formaRawPostModule(post, path),
			content: undefined
		}))
		.filter((post) => post.img && post.slug !== slug);

	const randPosts = allPostsFormatted.sort(() => 0.5 - Math.random()).slice(0, 3);

	if (!post) {
		return error(404, 'Post not found');
	}

	const meta = formaRawPostModule(post, path);

	return {
		content: post.default,
		meta,
		randPosts
	};
};

export const prerender = true;
