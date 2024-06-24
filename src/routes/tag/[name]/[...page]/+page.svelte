<script>
	import SvelteSeo from 'svelte-seo';
	import { SITE_URL, formattedTitle } from '$lib';
	import QueryPage from '$lib/components/QueryPage.svelte';

	export let data;

	let { posts, totalPages, page: currentPage, tagName } = data;

	$: {
		posts = data.posts;
		totalPages = data.totalPages;
		currentPage = data.page;
	}
</script>

<SvelteSeo
	title={formattedTitle('Tag - ' + tagName + ' | Page ' + currentPage)}
	description={'Posts tagged with ' + tagName + '. Page ' + currentPage}
	canonical={SITE_URL + '/tag/' + tagName + '/page/' + currentPage}
	openGraph={{
		title: formattedTitle('Tag - ' + tagName + ' | Page ' + currentPage),
		description: 'Posts tagged with ' + tagName + '. Page ' + currentPage,
		url: SITE_URL + '/tag/' + tagName + '/page/' + currentPage,
		type: 'article',
		images: [
			{
				url: SITE_URL + '/og-image.png',
				width: 800,
				height: 600,
				alt: 'OG Image'
			}
		],
		locale: 'en_US',
		site_name: 'Tronic247'
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@posandu',
		title: formattedTitle('Tag - ' + tagName + ' | Page ' + currentPage),
		description: 'Posts tagged with ' + tagName + '. Page ' + currentPage,
		image: SITE_URL + '/og-image.png',
		imageAlt: 'OG Image'
	}}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'Article',
		name: 'Tag - ' + tagName + ' | Page ' + currentPage,
		description: 'Posts tagged with ' + tagName + '. Page ' + currentPage,
		url: SITE_URL + '/tag/' + tagName + '/page/' + currentPage
	}}
/>

<h1 class="mt-8 text-2xl font-semibold">
	Posts tagged with <span class="text-primary">#{tagName}</span>
</h1>

<p class="mb-8 mt-4">
	A list of all posts tagged with <span class="text-primary">#{tagName}</span>.
</p>

<QueryPage {currentPage} {posts} {totalPages} urlFn={(page) => `/tag/${tagName}/page/${page}`} />
