<script lang="ts">
	import { SITE_URL, formattedTitle, makeID } from '$lib';
	import SvelteSeo from 'svelte-seo';
	import Comments from '$lib/components/Comments.svelte';
	import { onMount } from 'svelte';
	import Img from '@zerodevx/svelte-img';
	import Icon from '@iconify/svelte';
	import { CATEGORY_NAMES } from '$lib/sorting.js';
	import Toc from '$lib/components/TOC.svelte';

	let { data } = $props();

	let categories = data.meta.categories;
	let tags = data.meta.tags;
	let date = data.meta.date;
	let title = data.meta.title;
	let img = data.meta.img;
	let excerpt = data.meta.excerpt.trim() || title;
	let slug = data.meta.slug;
	let lastUpdated = data.meta.lastModified;

	let contentEl: HTMLElement | undefined = $state();
	let headings: HTMLHeadingElement[] = $state([]);

	onMount(() => {
		import('@justinribeiro/lite-youtube');
	});

	$effect(() => {
		if (contentEl) {
			const h2s = contentEl.querySelectorAll('h2');

			headings = [...h2s];
		}
	});
	const SEO = {
		title: formattedTitle(title),
		description: excerpt.length > 0 ? excerpt : 'No description provided',
		datePublished: date.toISOString(),
		dateModified: lastUpdated ? new Date(lastUpdated).toISOString() : date.toISOString(),
		url: SITE_URL + slug,
		image: img
	};
</script>

<SvelteSeo
	title={SEO.title}
	description={SEO.description}
	canonical={SEO.url}
	openGraph={{
		title: SEO.title,
		description: SEO.description,
		url: SEO.url,
		type: 'article',
		article: {
			published_time: SEO.datePublished,
			modified_time: SEO.dateModified,
			author: ['Posandu Mapa'],
			tag: [...new Set([...(categories || []), ...(tags || [])])]
		}
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@posandu',
		title: SEO.title,
		description: SEO.description,
		image: SEO.image
	}}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'Article',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': SEO.url
		},
		headline: SEO.title,
		image: SEO.image,
		datePublished: SEO.datePublished,
		dateModified: SEO.dateModified
	}}
/>

{#if headings.length > 0 && contentEl}
	<Toc {headings} />
{/if}

<div class="mx-auto mt-16 flex max-w-5xl flex-col gap-8 px-4 md:flex-row md:gap-0">
	<div class="flex-1">
		<p class="mb-4">
			{#if categories && categories?.length > 0}
				{#each categories as category, i}
					<a
						href="/category/{category.toLowerCase()}"
						class="text-lg text-base-light"
						aria-label="{category} category"
					>
						{CATEGORY_NAMES[category] || category}
					</a>

					<span class="opacity-20">{i < categories.length - 1 ? ', ' : ''}</span>
				{/each}
			{/if}
		</p>

		<h1 class="title max-w-xl text-4xl font-bold">
			{title}
		</h1>
	</div>

	<div class="flex items-start justify-start md:flex-1 md:items-end md:justify-end">
		<p class="text-left text-base-light md:text-right">
			{new Date(date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}

			{#if lastUpdated}
				<br />

				Updated on {new Date(lastUpdated).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			{/if}
		</p>
	</div>
</div>

<div class="mx-auto mb-32 mt-16 h-[0.5px] w-full max-w-5xl bg-white/20"></div>

<main class="prose prose-invert text-[#e1e3ee] mx-auto">
	<div bind:this={contentEl} class="px-4">
		<data.content />
	</div>

	<div class="mt-8">
		{#if tags && tags?.length > 0}
			{#each tags as tag, i}
				<a href="/tag/{tag.toLowerCase()}" class="text-lg text-base-light" aria-label="{tag} tag">
					#{tag}
				</a>

				<span class="opacity-20">{i < tags.length - 1 ? ', ' : ''}</span>
			{/each}
		{/if}
	</div>
</main>

<div class="mx-auto mt-16 h-[0.5px] w-full max-w-5xl bg-base-light/20"></div>

<div class="mx-auto mt-16 max-w-5xl px-4">
	<main class="prose prose-invert mx-auto">
		<p class="mt-8 text-white">
			Something wrong or just found a typo? <a
				href="https://github.com/Posandu/tronic247/tree/main/posts/{slug}/index.md"
				class="underline"
				target="_blank">Edit this page on GitHub</a
			> and make a PR! Thank you!
		</p>
	</main>
</div>

<main class="prose prose-invert mx-auto mt-8 px-4">
	<Comments />
</main>

<style>
	.title {
		color: var(--md-sys-color-on-surface);
	}
</style>