import { formatPosts, getImportedPosts } from '$lib/posts';
import { queryManager, type Post } from '$lib/query';
import { error, redirect } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';

export async function load(req) {
	await getImportedPosts();

	let posts = formatPosts();

	const frontPage = new queryManager(posts, () => true);

	const url = req.url.pathname;
	/**
	 * Check if there's stuff after /archive
	 */
	const mainPath = '/archive/';
	const indexMainPath = url.indexOf(mainPath);

	if (indexMainPath !== -1) {
		const result = url.substring(indexMainPath + mainPath.length);

		if (!result.includes('page')) return error(404);
	}

	let page: number | undefined;

	const subPath = '/page/';
	const index = url.indexOf(subPath);

	if (index !== -1) {
		const result = url.substring(index + subPath.length);
		const num = parseInt(result);

		if (isNaN(num)) return error(404);
		else page = num;
	}

	if (!page) {
		page = 1;
	} else if (page === 1) {
		throw redirect(303, '/archive');
	} else if (page < 2 || page > frontPage.getPages()) {
		return error(404);
	}

	return {
		posts: frontPage.getPostsPerPage(page).map((i) => ({
			...i,
			content: undefined
		})),
		count: frontPage.getCount(),
		totalPages: frontPage.getPages(),
		page
	};
}

export const entries: EntryGenerator = async () => {
	await getImportedPosts();

	let posts = formatPosts();

	const frontPage = new queryManager(posts, () => true);

	const entries: { page: string }[] = Array(frontPage.getPages() - 1).map((_, i) => ({
		page: 'page/' + i + 1
	}));

	return entries;
};
