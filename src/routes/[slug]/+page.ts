import { formaRawPostModule, getImportedPosts } from '$lib/posts';
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
		.sort(() => Math.random() - 0.5)
		.slice(0, 6);

	const allImgs = import.meta.glob(/* @vite-ignore */ '../../../static/**/*.png', {
		query: {
			as: 'run'
		},
		eager: true
	});

	const newImgs: any = {};

	for (const key in allImgs) {
		const img: any = allImgs[key];
		newImgs[key.replace('../../../static', '')] = img.default;
	}

	return {
		content: post.default,
		postImg: meta.img && newImgs[meta.img],
		meta,
		randPosts: randPosts.map((post) => ({
			title: post.title,
			slug: post.slug
		}))
	};
};

export const prerender = true;
