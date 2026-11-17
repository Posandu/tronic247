// Server-only: eagerly imports every post. Keep this out of client code,
// or every post gets bundled into the browser.
export const getImportedPosts = async () => {
	const posts = import.meta.glob('../../../posts/*/index.md', { eager: true });

	return posts as Record<string, any>;
};
