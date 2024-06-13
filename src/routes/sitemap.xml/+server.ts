import { SITE_URL } from '$lib';
import { formaRawPostModule, getImportedPosts } from '$lib/posts';
import { SiteMap } from '$lib/sitemap';

export const prerender = true;

export const GET = async ({}) => {
	const sitemap = new SiteMap();

	/**
	 * All articles
	 */
	const allPosts = await getImportedPosts();
	const allPostsFormatted = Object.entries(allPosts).map(([path, post]) =>
		formaRawPostModule(post, path)
	);

	allPostsFormatted.forEach((post) => {
		sitemap.addPage({
			loc: SITE_URL + post.slug,
			lastmod: (post.lastModified),
			changefreq: 'monthly',
			priority: '0.8'
		});
	});

	return new Response(sitemap.generate(), {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
