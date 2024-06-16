import { formaRawPostModule } from '$lib/posts';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const slug = params.slug;
	const post = await import(`../../../posts/${slug}/index.md`);
	const path = `../../../posts/${slug}/index.md`;

	if (!post) {
		return error(404, 'Post not found');
	}

	const meta = formaRawPostModule(post, path);

	console.log(meta)
	return {
		content: post.default,
		meta
	};
};

export const prerender = true;
