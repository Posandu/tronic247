import { getImportedPosts, getPostFromSlug } from '$lib/posts';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	await getImportedPosts();

	const post = getPostFromSlug(params.slug);

	if (!post) {
		return error(404, 'Post not found');
	}

	return {
		post
	};
};
