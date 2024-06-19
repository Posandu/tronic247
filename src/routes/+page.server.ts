import { queryManager } from '$lib/query';

export async function load({ locals }) {
	const frontPage = new queryManager(locals.posts, () => true);
	const posts = frontPage.getPostsPerPage(1).map((i) => ({
		...i,
		content: undefined
	}));

	const images = locals.getImgObjects(posts);

	return {
		posts: posts.map((post) => ({
			...post,
			content: undefined,
			img: post.img ? images[post.img] : undefined
		}))
	};
}

export const prerender = true;
