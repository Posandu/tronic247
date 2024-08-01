<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import { formattedTitle, SITE_URL } from '$lib';
	import QueryPage from '$lib/components/QueryPage.svelte';
	import type { BlogPosting, ItemList } from 'schema-dts';

	export let data;

	let { posts, totalPages, page: currentPage } = data;

	$: {
		posts = data.posts;
		totalPages = data.totalPages;
		currentPage = data.page;
	}

	$: SEO = {
		title: formattedTitle(currentPage > 1 ? `Archive - Page ${currentPage}` : 'Archive'),
		description: 'A chronological list of all posts on Tronic247.',
		canonical: `${SITE_URL}archive${currentPage > 1 ? `/page/${currentPage}` : ''}`,
		items: posts.map((post, index) => ({
			'@type': 'ListItem',
			position: index + '',
			item: {
				'@type': 'BlogPosting',
				headline: post.title,
				url: `${SITE_URL}${post.slug}`,
				datePublished: post.date.toISOString(),
				image: post.img?.img?.src ? post.img.img.src : undefined
			} satisfies BlogPosting
		})) satisfies ItemList['itemListElement'],
		image: `${SITE_URL}og-image.png`
	};
</script>

<SvelteSeo
	title={SEO.title}
	description={SEO.description}
	canonical={SEO.canonical}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		itemListElement: SEO.items
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@posandu',
		title: SEO.title,
		description: SEO.description,
		image: SEO.image,
		imageAlt: 'OG Image'
	}}
	openGraph={{
		title: SEO.title,
		description: SEO.description,
		url: SEO.canonical,
		type: 'article',
		images: [
			{
				url: SEO.image,
				width: 800,
				height: 600,
				alt: 'OG Image'
			}
		],
		locale: 'en_US',
		site_name: 'Tronic247'
	}}
/>

<div class="mx-auto max-w-4xl px-4">
	<h1 class="mt-8 text-2xl font-semibold">Archive</h1>

	<p class="mb-8 mt-4">A chronological list of all posts on Tronic247.</p>
</div>

<div class="mx-auto max-w-4xl px-4">
	<QueryPage {currentPage} {posts} {totalPages} urlFn={(page) => `/archive/page/${page}`} />
</div>
