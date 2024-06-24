import { sitemap } from '$lib/sitemapGen';

export const prerender = true;

export const GET = async () => {
	return new Response(sitemap.generateRssFeed(), {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
