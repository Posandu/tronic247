import { formaRawPostModule } from '#lib/posts.ts';
import { error } from '@sveltejs/kit';

export const load = async ({ params, data }) => {
	const slug = params.slug;
	const post = await import(`../../../posts/${slug}/index.md`);

	if (!post) {
		return error(404, 'Post not found');
	}

	const path = `../../../posts/${slug}/index.md`;
	const meta = formaRawPostModule(post, path);

	return {
		...data,
		content: post.default,
		meta
	};
};

export const prerender = true;
