import { formaRawPostModule, getImportedPosts } from '$lib/posts';
import { queryManager, type Post } from '$lib/query';
import { error, redirect } from '@sveltejs/kit';

export async function load(req) {
	const frontPage = new queryManager(
		(await req.parent()).allPostsFormatted,
		(post) => post.categories?.includes(req.params.name) || false
	);

	const pages = frontPage.getPages();

	if (pages === 0) return error(404);

	const url = req.url.pathname;
	/**
	 * Check if there's stuff after /archive
	 */
	const mainPath = `/category/${req.params.name}/`;
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
		throw redirect(303, mainPath);
	} else if (page < 2 || page > pages) {
		return error(404);
	}

	return {
		posts: frontPage.getPostsPerPage(page).map((i) => ({
			...i,
			content: undefined
		})),
		count: frontPage.getCount(),
		totalPages: pages,
		page,
		category: req.params.name
	};
}

export const prerender = true;
