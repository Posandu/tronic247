import type { Post } from './query';

let globPosts: any = {};

const getImportedPosts = async () => {
	const posts = import.meta.glob('../../posts/*.md', { eager: true });

	globPosts = posts;

	return posts;
};

const formatPosts = () => {
	return Object.keys(globPosts).map((path) => {
		const post = globPosts[path];

		const { metadata } = post;

		return {
			title: metadata.title,
			date: new Date(metadata.date),
			slug: path?.split('/').pop()?.replace('.md', '') || '',
			tags: metadata.tags,
			categories: metadata.categories,
			content: post.default,
			img: metadata.img,
			excerpt: post.excerpt
		} satisfies Post;
	});
};

const getPostFromSlug = (slug: string) => {
	const post = globPosts[`../../posts/${slug}.md`];

	if (!post) {
		return null;
	}

	const { metadata } = post;

	return {
		title: metadata.title,
		date: new Date(metadata.date),
		slug: slug,
		tags: metadata.tags,
		categories: metadata.categories,
		content: post.default,
		img: metadata.img,
		excerpt: post.excerpt
	} satisfies Post;
};

export { getImportedPosts, formatPosts, getPostFromSlug };
