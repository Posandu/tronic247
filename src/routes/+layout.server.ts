import { getStats } from '#lib/posts.ts';

export const load = async ({ url, locals }) => {
	const stats = getStats(locals.posts);

	return {
		stats,
		url: url.pathname
	};
};
