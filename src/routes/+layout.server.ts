import { getStats } from '$lib/posts';

export const load = async ({ url, locals }) => {
	const stats = getStats(locals.posts);

	return {
		stats,
		url: url.pathname
	};
};
