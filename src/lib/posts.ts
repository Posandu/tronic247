import type { Post } from './query';

let globPosts: any = {};
let globTags: string[] = [];
let globCategories: string[] = [];

const getImportedPosts = async () => {
	const posts = import.meta.glob('../../posts/*/index.md', { eager: true });

	globPosts = posts;

	return posts;
};

const formatPosts = () => {
	return Object.keys(globPosts).map((path) => {
		const post = globPosts[path];

		const { metadata } = post;

		metadata.tags = metadata.tags || [];
		metadata.categories = metadata.categories || [];
		metadata.img = metadata.img || '/placeholder.webp';

		metadata.tags = metadata.tags.map((tag: string) => tag.trim().toLowerCase());
		metadata.categories = metadata.categories.map((category: string) =>
			category.trim().toLowerCase()
		);

		const mdata = {
			title: metadata.title,
			date: new Date(metadata.date),
			slug: path.split('/')[3],
			tags: metadata.tags,
			categories: metadata.categories,
			content: post.default,
			img: metadata.img,
			excerpt: post.excerpt
		} satisfies Post;

		globTags = [...new Set([...globTags, ...metadata.tags])];
		globCategories = [...new Set([...globCategories, ...metadata.categories])];

		return mdata;
	});
};

const getTags = () => {
	return globTags;
};

const getCategories = () => {
	return globCategories;
};

const getPostFromSlug = (slug: string) => {
	const post = globPosts[`../../posts/${slug}/index.md`];

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

export { getImportedPosts, formatPosts, getPostFromSlug, getTags, getCategories };
