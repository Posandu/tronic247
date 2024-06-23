<script>
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import ArticleView from '$lib/components/ArticleView.svelte';
	import { page } from '$app/stores';
	import Pagination from '$lib/components/Pagination.svelte';
	import SvelteSeo from 'svelte-seo';
	import { SITE_URL, formattedTitle } from '$lib';
	import QueryPage from '$lib/components/QueryPage.svelte';

	export let data;

	let { posts, totalPages, page: currentPage, category } = data;

	$: {
		posts = data.posts;
		totalPages = data.totalPages;
		currentPage = data.page;
	}
</script>

<SvelteSeo
	title={formattedTitle('Category - ' + category + ' | Page ' + currentPage)}
	description={'Posts in the category ' + category + '. Page ' + currentPage}
	canonical={SITE_URL + '/category/' + category + '/page/' + currentPage}
	openGraph={{
		title: formattedTitle('Category - ' + category + ' | Page ' + currentPage),
		description: 'Posts in the category ' + category + '. Page ' + currentPage,
		url: SITE_URL + '/category/' + category + '/page/' + currentPage,
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
		title: formattedTitle('Category - ' + category + ' | Page ' + currentPage),
		description: 'Posts in the category ' + category + '. Page ' + currentPage,
		image: SITE_URL + '/og-image.png',
		imageAlt: 'OG Image'
	}}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'Article',
		name: 'Category - ' + category + ' | Page ' + currentPage,
		description: 'Posts in the category ' + category + '. Page ' + currentPage,
		url: SITE_URL + '/category/' + category + '/page/' + currentPage
	}}
/>

<h1 class="mt-8 text-2xl font-semibold">
	Category - {category}
</h1>

<p class="mb-8 mt-4">
	A list of all posts in the category <span class="text-primary">{category}</span>.
</p>

<QueryPage
	{currentPage}
	{posts}
	{totalPages}
	urlFn={(page) => `/category/${category}/page/${page}`}
/>
