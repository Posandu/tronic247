<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import { SITE_URL, formattedTitle } from '$lib';
	import QueryPage from '$lib/components/QueryPage.svelte';
	import { CATEGORY_NAMES } from '$lib/sorting';
	import type { BlogPosting, ItemList } from 'schema-dts';

	let { data } = $props();

	let posts = $derived(data.posts);
	let totalPages = $derived(data.totalPages);
	let currentPage = $derived(data.page);
	let category = $derived(data.category);

	let SEO = $derived({
		title: formattedTitle(CATEGORY_NAMES[category] || category),
		description: `A list of all posts in the category ${category}. ${currentPage > 1 ? `Page ${currentPage}` : ''}`,
		canonical: `${SITE_URL}category/${category}/${currentPage > 1 ? `/page/${currentPage}` : ''}`,
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
	});
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

<h1 class="title max-w-5xl px-4 mt-16 mx-auto text-4xl font-bold">
	{CATEGORY_NAMES[category] || category}
</h1>

<div class="mx-auto max-w-5xl px-4">
	<QueryPage
		{currentPage}
		{posts}
		{totalPages}
		urlFn={(page) => `/category/${category}/page/${page}`}
	/>
</div>
