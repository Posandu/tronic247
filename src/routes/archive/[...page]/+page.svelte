<script>
	import SvelteSeo from 'svelte-seo';
	import { SITE_URL, formattedTitle } from '$lib';
	import QueryPage from '$lib/components/QueryPage.svelte';

	export let data;

	let { posts, totalPages, page: currentPage } = data;

	$: {
		posts = data.posts;
		totalPages = data.totalPages;
		currentPage = data.page;
	}
</script>

<SvelteSeo
	title={formattedTitle('Archive | Page ' + currentPage)}
	description={'Archive of all posts on Tronic247. Page ' + currentPage}
	canonical={SITE_URL + '/archive/page/' + currentPage}
	openGraph={{
		title: formattedTitle('Archive | Page ' + currentPage),
		description: 'Archive of all posts on Tronic247. Page ' + currentPage,
		url: SITE_URL + '/archive/page/' + currentPage,
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
		title: formattedTitle('Archive | Page ' + currentPage),
		description: 'Archive of all posts on Tronic247. Page ' + currentPage,
		image: SITE_URL + '/og-image.png',
		imageAlt: 'OG Image'
	}}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'Article',
		name: 'Archive | Page ' + currentPage,
		description: 'Archive of all posts on Tronic247. Page ' + currentPage,
		url: SITE_URL + '/archive/page/' + currentPage
	}}
/>

<h1 class="mt-8 text-2xl font-semibold">Archive</h1>

<p class="mb-8 mt-4">A chronological list of all posts on Tronic247.</p>

<QueryPage {currentPage} {posts} {totalPages} urlFn={(page) => `/archive/page/${page}`} />
