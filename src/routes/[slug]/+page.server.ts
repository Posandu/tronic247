export const load = ({ params, locals }) => {
	const post = locals.posts.find((post) => post.slug === params.slug);

	return {
		cover: post?.img ? locals.imgData[post.img] : undefined
	};
};

export const prerender = true;
