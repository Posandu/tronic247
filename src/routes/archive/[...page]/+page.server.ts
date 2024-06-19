import { queryManager } from '$lib/query';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals, url: reqUrl }) {
	const frontPage = new queryManager(locals.posts, () => true);

	const url = reqUrl.pathname;
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

	const posts = frontPage.getPostsPerPage(page).map((i) => ({
		...i,
		content: undefined
	}));
	const images = locals.getImgObjects(posts);

	return {
		posts: posts.map((post) => ({
			...post,
			content: undefined,
			img: post.img ? images[post.img] : undefined
		})),
		count: frontPage.getCount(),
		totalPages: frontPage.getPages(),
		page
	};
}

export const prerender = true;
