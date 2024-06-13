import type { Post } from './query';

const getImportedPosts = async () => {
	const posts = import.meta.glob('../../posts/*/index.md', { eager: true });

	return posts as Record<string, any>;
};

const formaRawPostModule = (post: any, path: string): Post => {
	const { meta, length } = post;

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
		excerpt: post.excerpt,
		length,
		lastModified: meta.lastModified
	} satisfies Post;

	return mdata;
};

const getStats = (posts: Post[]) => {
	const tags = new Set<string>();
	const categories = new Set<string>();
	let charCount = 0;
	const postCount = posts.length;

	posts.forEach((post) => {
		if (post.tags) post.tags.forEach((tag) => tags.add(tag.toLowerCase()));
		if (post.categories)
			post.categories.forEach((category) => categories.add(category.toLowerCase()));

		charCount += post.length || 0;
	});

	return { tags, categories, charCount, postCount };
};

export { getImportedPosts, formaRawPostModule, getStats };
