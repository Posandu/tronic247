import { SITE_URL } from '$lib';
import { formaRawPostModule, getImportedPosts } from './posts';
import { queryManager } from './query';
import { SiteMap } from './sitemap';

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
		priority: '0.8',
		excerpt: post.excerpt,
		title: post.title
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
	priority: '1.0',
	title: 'Home',
	excerpt: 'Welcome to my blog!',
	excludeInRss: true
});

/**
 * Tags
 */
const tags = new Set<string>();
allPostsFormatted.forEach((post) => {
	post.tags?.forEach((tag) => tags.add(tag));
});

tags.forEach((tag) => {
	const tagPosts = new queryManager(allPostsFormatted, (post) => post.tags?.includes(tag) || false);

	const pages = tagPosts.getPages();

	if (pages === 0) return;

	sitemap.addPage({
		loc: `${SITE_URL}tag/${tag}`,
		lastmod: tagPosts.getLastModified(),
		changefreq: 'daily',
		priority: '0.8',
		title: tag,
		excerpt: `Posts tagged with ${tag}`,
		excludeInRss: true
	});

	new Array(pages).fill(0).forEach((_, i) => {
		sitemap.addPage({
			loc: `${SITE_URL}tag/${tag}/page/${i + 1}`,
			lastmod: tagPosts.getLastModified(),
			changefreq: 'daily',
			priority: '0.8',
			title: tag,
			excerpt: `Posts tagged with ${tag}`,
			excludeInRss: true
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
		priority: '0.8',
		title: category,
		excerpt: `Posts in category ${category}`,
		excludeInRss: true
	});

	new Array(pages).fill(0).forEach((_, i) => {
		sitemap.addPage({
			loc: `${SITE_URL}category/${category}/page/${i + 1}`,
			lastmod: categoryPosts.getLastModified(),
			changefreq: 'daily',
			priority: '0.8',
			title: category,
			excerpt: `Posts in category ${category}`,
			excludeInRss: true
		});
	});
});

/**
 * Snippets
 */
const snippets = import.meta.glob('../../snippets/*.md', { eager: true });
const formattedSnippets = Object.entries(snippets).map(([path, post]) =>
	formaRawPostModule(post, path)
);

formattedSnippets.forEach((post) => {
	sitemap.addPage({
		loc: SITE_URL + 'snippets/' + post.title.toLowerCase().replace(/\s/g, '-'),
		lastmod: new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		}),
		changefreq: 'monthly',
		priority: '0.8',
		excerpt: post.title,
		title: post.title
	});
});

export { sitemap };
