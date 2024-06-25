import type { Post } from './query';

const getImportedPosts = async () => {
	const posts = import.meta.glob('../../posts/*/index.md', { eager: true });

	return posts as Record<string, any>;
};

const formaRawPostModule = (post: any, path: string): Post => {
	const { meta, length } = post;

	meta.tags = meta.tags || [];
	meta.categories = meta.categories || [];

	if (meta.updated) meta.lastModified = new Date(meta.updated);

	meta.tags = meta.tags.map((tag: string) => tag.trim().toLowerCase());
	meta.categories = meta.categories.map((category: string) => category.trim().toLowerCase());

	const slug = /posts\/(.*?)\/index\.md/g.exec(path);

	const mdata = {
		title: meta.title,
		date: new Date(meta.date),
		slug: slug ? slug[1] : '',
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
	const categories = new Set<string>();
	const postCount = posts.length;

	posts.forEach((post) => {
		if (post.tags) post.tags.forEach((tag) => categories.add(tag.toLowerCase()));
		if (post.categories)
			post.categories.forEach((category) => categories.add(category.toLowerCase()));
	});

	return { categories, postCount };
};

export { getImportedPosts, formaRawPostModule, getStats };
