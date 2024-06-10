export const load = async ({ params }) => {
	const content = await import('../../../snippets/test.md');

	return {
		content: content.default
	};
};

export const prerender = true;
