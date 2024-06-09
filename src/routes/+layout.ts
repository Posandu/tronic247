import { getCategories, getTags } from '$lib/posts';

export const load = async () => {
	return {
		tags: getTags(),
		categories: getCategories()
	};
};

export const prerender = true;
