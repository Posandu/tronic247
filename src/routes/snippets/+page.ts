import { formaRawPostModule } from '$lib/posts';

export const load = async ({ params }) => {
	const snippets = import.meta.glob('../../../snippets/*.md', { eager: true });
	const formatted = Object.entries(snippets).map(([path, post]) => formaRawPostModule(post, path));

	return {
		snippets: formatted
	};
};

export const prerender = true;
