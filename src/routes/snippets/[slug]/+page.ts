import { formaRawPostModule } from '$lib/posts';
import { error } from '@sveltejs/kit';

export const load = async ({ params: { slug } }) => {
	const snippets = import.meta.glob('../../../../snippets/*.md', { eager: true });
	const formatted = Object.entries(snippets).map(([path, post]) => formaRawPostModule(post, path));

	const item = formatted.find(
		(item) => item.title.toLowerCase().replace(/\s/g, '-') === slug.toLowerCase()
	);

	if (!item) return error(404, 'Not found');

	return {
		item
	};
};

export const prerender = true;
