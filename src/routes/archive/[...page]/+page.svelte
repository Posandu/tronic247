<script>
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import ArticleView from '$lib/components/ArticleView.svelte';
	import { page } from '$app/stores';
	import Pagination from '$lib/components/Pagination.svelte';
	import SvelteSeo from 'svelte-seo';
	import { SITE_URL, formattedTitle } from '$lib';

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

<p class="mb-4 mt-4">Here you can find all the posts that have been published on this blog.</p>

<Pagination {totalPages} {currentPage} urlFn={(page) => `/archive/page/${page}`} />

<div class="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
	{#each posts as { categories, date, title, excerpt, slug, img }}
		<ArticleView {categories} {date} {title} {excerpt} {slug} {img} class="col-span-1" />
	{/each}
</div>
