import type { Snippet } from 'svelte';

export type Post = {
	title: string;
	content: Snippet;
	slug: string;
	date: Date;
	tags?: string[];
	img?: string;
	categories?: string[];
	excerpt: string;
	length?: number;
	lastModified?: string;
};

export type PostWithoutContent = Omit<Post, 'content'>;

type QueryFn = (post: Post) => boolean;

const PER_PAGE = 9;

class queryManager {
	query: QueryFn;
	posts: Post[];

	constructor(posts: Post[], query: QueryFn) {
		this.query = query;
		this.posts = posts.sort((a, b) => b.date.getTime() - a.date.getTime());
	}

	exec() {
		return this.posts.filter(this.query);
	}

	getCount() {
		return this.exec().length;
	}

	getPostsPerPage(page: number) {
		const posts = this.exec().slice((page - 1) * PER_PAGE, page * PER_PAGE);

		return posts;
	}

	getPages() {
		return Math.ceil(this.getCount() / PER_PAGE);
	}

	getLastModified() {
		const posts = this.exec();
		const lastModified = posts.reduce((acc, post) => {
			const postDate = new Date(post.lastModified || post.date).getTime();

			if (postDate > acc) return postDate;

			return acc;
		}, 0);

		return new Date(lastModified).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		});
	}
}

export { queryManager };
