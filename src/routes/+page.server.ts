export const prerender = true;

import { formaRawPostModule, getImportedPosts, getStats } from '$lib/posts';
import { queryManager, type Post } from '$lib/query';
import { error, redirect } from '@sveltejs/kit';

export async function load(req) {
	const parentData = await req.parent();

	const frontPage = new queryManager(parentData.allPostsFormatted, () => true);

	return {
		posts: frontPage.getPostsPerPage(1).map((i) => ({
			...i,
			content: undefined
		})),
		stats: parentData.stats
	};
}
