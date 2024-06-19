import { formaRawPostModule, getImportedPosts } from '$lib/posts';
import type { Post } from '$lib/query.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const slug = params.slug;
	const post = await import(`../../../posts/${slug}/index.md`);

	if (!post) {
		return error(404, 'Post not found');
	}

	const path = `../../../posts/${slug}/index.md`;
	const meta = formaRawPostModule(post, path);

	const allPosts = await getImportedPosts();
	const allPostsFormatted = Object.entries(allPosts)
		.map(([path, post]) => ({
			...formaRawPostModule(post, path),
			content: undefined
		}))
		.filter((post) => post.img && post.slug !== slug);

	const randPosts = allPostsFormatted
		.filter((post) => post.title !== meta.title)
		.sort(() => 0.5 - Math.random())
		.slice(0, 3);

	const allImgs = import.meta.glob('../../../static/**/*.png', {
		query: {
			enhanced: true
		},
		eager: true
	});

	const newImgs: any = {};

	for (const key in allImgs) {
		const img: any = allImgs[key];
		newImgs[key.replace('../../../static', '')] = img.default;
	}

	const getImgObjects = (posts: Post[]) => {
		const imgObjects: any = {};

		for (const post of posts) {
			if (post.img) {
				imgObjects[post.img] = newImgs[post.img];
			}
		}

		return imgObjects;
	};

	const randPostsObj = getImgObjects(randPosts);

	return {
		content: post.default,
		postImg: meta.img && newImgs[meta.img],
		meta,
		randPosts: randPosts.map((post) => ({
			title: post.title,
			slug: post.slug,
			img: post.img && randPostsObj[post.img]
		}))
	};
};

export const prerender = true;
