export const prerender = true;

import { formaRawPostModule, getImportedPosts, getStats } from '$lib/posts';
import { queryManager, type Post } from '$lib/query';
import { error, redirect } from '@sveltejs/kit';

export async function load(req) {
	const allPosts = await getImportedPosts();
	const allPostsFormatted = Object.entries(allPosts).map(([path, post]) =>
		formaRawPostModule(post, path)
	);

	const stats = getStats(allPostsFormatted);

	const frontPage = new queryManager(allPostsFormatted, () => true);

	return {
		posts: frontPage.getPostsPerPage(1).map((i) => ({
			...i,
			content: undefined
		})),
		stats
	};
}
