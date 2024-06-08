export const load = async ({ params }) => {
	const content = await import('../../../src/routes/[slug]/snip.md');

	return {
		content: content.default,
	};
};
