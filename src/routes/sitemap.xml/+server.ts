import { sitemap } from '#lib/sitemapGen.ts';

export const prerender = true;

export const GET = async () => {
	return new Response(sitemap.generate(), {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
