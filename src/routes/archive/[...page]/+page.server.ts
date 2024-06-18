import { queryManager } from '$lib/query';
import { error, redirect } from '@sveltejs/kit';

export async function load(req) {
	const allPostsFormatted = (await req.parent()).allPostsFormatted;
	if (!allPostsFormatted) return error(500, 'Error loading posts');

	const frontPage = new queryManager(allPostsFormatted, () => true);

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

export const prerender = true;
export const csr = false;
