import { SiteMap } from '$lib/sitemap.js';

export const prerender = true;

export const GET = ({}) => {
	const sitemap = new SiteMap();

	return new Response(sitemap.generate(), {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
