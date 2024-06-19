import { queryManager } from '$lib/query';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals, params: { name }, url: reqUrl }) {
	const frontPage = new queryManager(
		locals.posts,
		(post) => post.tags?.includes(name.trim().toLowerCase()) || false
	);

	const pages = frontPage.getPages();

	if (pages === 0) return error(404);

	const url = reqUrl.pathname;
	/**
	 * Check if there's stuff after /archive
	 */
	const mainPath = `/tag/${name}/`;
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
		totalPages: pages,
		page,
		tagName: name
	};
}

export const prerender = true;
