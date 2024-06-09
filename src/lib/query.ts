export type Post = {
	title: string;
	content: any;
	slug: string;
	date: Date;
	tags?: string[];
	img?: string;
	categories?: string[];
	excerpt: string;
};

type QueryFn = (post: Post) => boolean;

const PER_PAGE = 5;

class queryManager {
	query: QueryFn;
	posts: Post[];

	constructor(posts: Post[], query: QueryFn) {
		this.query = query;
		this.posts = posts.sort((a, b) => b.date.getTime() - a.date.getTime());
	}

	exec() {
		console.log("queryManager.exec() called")
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
}

export { queryManager };
