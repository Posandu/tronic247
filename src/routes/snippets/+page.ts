export const load = async ({ params }) => {
	const content = await import('../../../posts/3-javascriptvoid-alternatives/index.md');

	return {
		content: content.default
	};
};
