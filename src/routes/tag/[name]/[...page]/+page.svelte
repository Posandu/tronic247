<script>
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import ArticleView from '$lib/components/ArticleView.svelte';
	import { page } from '$app/stores';
	import Pagination from '$lib/components/Pagination.svelte';
	import SvelteSeo from 'svelte-seo';
	import { SITE_URL, formattedTitle } from '$lib';

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

<p class="mb-4 mt-4">
	All posts tagged with <span class="text-primary">#{tagName}</span> are listed below.
</p>

<Pagination {totalPages} {currentPage} urlFn={(page) => `/tag/${tagName}/page/${page}`} />

<div class="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
	{#each posts as { categories, date, title, excerpt, slug, img }}
		<ArticleView {categories} {date} {title} {excerpt} {slug} {img} class="col-span-1" />
	{/each}
</div>
