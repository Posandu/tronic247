<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import { SITE_URL, formattedTitle } from '$lib';
	import QueryPage from '$lib/components/QueryPage.svelte';
	import type { BlogPosting } from 'schema-dts';
	import type { ItemList } from 'schema-dts';

	export let data;

	let { posts, totalPages, page: currentPage, tagName } = data;

	$: {
		posts = data.posts;
		totalPages = data.totalPages;
		currentPage = data.page;
	}

	$: SEO = {
		title: formattedTitle('#' + tagName),
		description: `A list of all posts tagged with ${tagName}. ${currentPage > 1 ? `Page ${currentPage}` : ''}`,
		canonical: `${SITE_URL}tag/${tagName}/${currentPage > 1 ? `/page/${currentPage}` : ''}`,
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
				alt: 'OG Image'
			}
		],
		locale: 'en_US',
		site_name: 'Tronic247'
	}}
/>

<h1 class="mt-8 text-2xl font-semibold">
	<span class="text-primary">#{tagName}</span>
</h1>

<p class="mb-8 mt-4">
	A list of all posts tagged with <span class="text-primary">#{tagName}</span>.
</p>

<QueryPage {currentPage} {posts} {totalPages} urlFn={(page) => `/tag/${tagName}/page/${page}`} />
