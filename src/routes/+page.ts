import { formatPosts, getImportedPosts } from '$lib/posts';
import { queryManager, type Post } from '$lib/query';
import { error } from '@sveltejs/kit';

export async function load() {
	await getImportedPosts();

	const posts = formatPosts();

	const frontPage = new queryManager(posts, () => true);

	return {
		posts: frontPage.getPostsPerPage(1)
	};
}
