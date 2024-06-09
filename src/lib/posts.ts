import type { Post } from './query';

const getImportedPosts = async () => {
	const posts = import.meta.glob('../../posts/*/index.md', { eager: true });

	return posts as Record<string, any>;
};

const formaRawPostModule = (post: any, path: string): Post => {
	const { meta } = post;

	meta.tags = meta.tags || [];
	meta.categories = meta.categories || [];

	meta.tags = meta.tags.map((tag: string) => tag.trim().toLowerCase());
	meta.categories = meta.categories.map((category: string) => category.trim().toLowerCase());

	const mdata = {
		title: meta.title,
		date: new Date(meta.date),
		slug: path.split('/')[3],
		tags: meta.tags,
		categories: meta.categories,
		content: post.default,
		img: meta.img,
		excerpt: post.excerpt
	} satisfies Post;

	return mdata;
};

export { getImportedPosts, formaRawPostModule };
