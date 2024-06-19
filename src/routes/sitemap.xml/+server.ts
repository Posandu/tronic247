import { SITE_URL } from '$lib';
import { formaRawPostModule, getImportedPosts } from '$lib/posts';
import { queryManager } from '$lib/query.js';
import { SiteMap } from '$lib/sitemap';

export const prerender = true;

export const GET = async () => {
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
			lastmod: new Date(post.lastModified || post.date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric'
			}),
			changefreq: 'monthly',
			priority: '0.8'
		});
	});

	/**
	 * Main page
	 */
	sitemap.addPage({
		loc: SITE_URL,
		lastmod: new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		}),
		changefreq: 'daily',
		priority: '1.0'
	});

	/**
	 * Tags
	 */
	const tags = new Set<string>();
	allPostsFormatted.forEach((post) => {
		post.tags?.forEach((tag) => tags.add(tag));
	});

	tags.forEach((tag) => {
		const tagPosts = new queryManager(
			allPostsFormatted,
			(post) => post.tags?.includes(tag) || false
		);

		const pages = tagPosts.getPages();

		if (pages === 0) return;

		sitemap.addPage({
			loc: `${SITE_URL}tag/${tag}`,
			lastmod: tagPosts.getLastModified(),
			changefreq: 'daily',
			priority: '0.8'
		});

		new Array(pages).fill(0).forEach((_, i) => {
			sitemap.addPage({
				loc: `${SITE_URL}tag/${tag}/page/${i + 1}`,
				lastmod: tagPosts.getLastModified(),
				changefreq: 'daily',
				priority: '0.8'
			});
		});
	});

	/**
	 * Categories
	 */
	const categories = new Set<string>();
	allPostsFormatted.forEach((post) => {
		post.categories?.forEach((category) => categories.add(category));
	});

	categories.forEach((category) => {
		const categoryPosts = new queryManager(
			allPostsFormatted,
			(post) => post.categories?.includes(category) || false
		);

		const pages = categoryPosts.getPages();

		if (pages === 0) return;

		sitemap.addPage({
			loc: `${SITE_URL}category/${category}`,
			lastmod: categoryPosts.getLastModified(),
			changefreq: 'daily',
			priority: '0.8'
		});

		new Array(pages).fill(0).forEach((_, i) => {
			sitemap.addPage({
				loc: `${SITE_URL}category/${category}/page/${i + 1}`,
				lastmod: categoryPosts.getLastModified(),
				changefreq: 'daily',
				priority: '0.8'
			});
		});
	});

	/**
	 * Sponsor page
	 */
	sitemap.addPage({
		loc: `${SITE_URL}sponsor`,
		lastmod: new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		}),
		changefreq: 'monthly',
		priority: '0.8'
	});

	/**
	 * Snippets page
	 */
	sitemap.addPage({
		loc: `${SITE_URL}snippets`,
		lastmod: new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		}),
		changefreq: 'monthly',
		priority: '0.8'
	});

	return new Response(sitemap.generate(), {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
