import { formaRawPostModule, getImportedPosts } from '$lib/posts';
import type { Post } from '$lib/query';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const allImgs = import.meta.glob('../static/**/*.png', {
		query: {
			as: 'run'
		},
		eager: true,
		exhaustive: true
	});

	const newImgs: any = {};

	for (const key in allImgs) {
		const img: any = allImgs[key];
		newImgs[key.replace('../static', '')] = img.default;
	}

	const allPosts = await getImportedPosts();
	const allPostsFormatted = Object.entries(allPosts).map(([path, post]) =>
		formaRawPostModule(post, path)
	);

	const getImgObjects = (posts: Post[]) => {
		const imgObjects: any = {};

		for (const post of posts) {
			if (post.img) {
				imgObjects[post.img] = newImgs[post.img];
			}
		}

		return imgObjects;
	};

	event.locals.imgData = newImgs;
	event.locals.posts = allPostsFormatted;
	event.locals.getImgObjects = getImgObjects;

	const response = await resolve(event);
	return response;
};
