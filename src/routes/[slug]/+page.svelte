<script lang="ts">
	import { SITE_URL, formattedTitle, makeID } from '$lib';
	import SvelteSeo from 'svelte-seo';
	import Comments from '$lib/components/Comments.svelte';
	import { onMount } from 'svelte';
	import Img from '@zerodevx/svelte-img';
	import Icon from '@iconify/svelte';

	let { data } = $props();

	let categories = data.meta.categories;
	let tags = data.meta.tags;
	let date = data.meta.date;
	let title = data.meta.title;
	let img = data.meta.img;
	let excerpt = data.meta.excerpt.trim() || title;
	let slug = data.meta.slug;
	let lastUpdated = data.meta.lastModified;

	onMount(() => {
		import('@justinribeiro/lite-youtube');
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

<div class="mx-auto mt-8 max-w-3xl px-4">
	<div class="relative w-full max-w-full overflow-hidden rounded-xl" id={makeID(slug)}>
		{#if img}
			<Img src={data.postImg} class="w-full" />
		{/if}
	</div>

	<h1 class="my-4 text-center text-4xl font-black" id={makeID(slug + 'title')}>{title}</h1>

	<p
		class="my-4 text-center text-xs font-semibold uppercase text-neutral-700"
		aria-label="Published on"
	>
		Published on {new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})}

		{#if lastUpdated}
			<span class="mx-1">•</span>

			Updated on {new Date(lastUpdated).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		{/if}
	</p>

	<main class="prose bg-white/40">
		<data.content />
	</main>

	<div class="my-8 text-sm font-semibold uppercase text-neutral-700">
		{#if categories && categories?.length > 0}
			<div class="flex items-center justify-start gap-1">
				<Icon icon="mdi:category" />

				<p class="inline" aria-label="Categories">
					{#each categories as category, i}
						<a
							class="text-xs hover:underline"
							href="/category/{category.toLowerCase()}"
							aria-label="{category} category">{category}</a
						>{i < categories.length - 1 ? ', ' : ''}
					{/each}
				</p>
			</div>
		{/if}

		{#if tags && tags?.length > 0}
			<div class="flex items-center justify-start gap-1">
				<Icon icon="mdi:tag" />

				<p class="inline" aria-label="Tags">
					{#each tags as tag, i}
						<a
							class="text-xs hover:underline"
							href="/tag/{tag.toLowerCase()}"
							aria-label="{tag} tag">{tag}</a
						>{i < tags.length - 1 ? ', ' : ''}
					{/each}
				</p>
			</div>
		{/if}
	</div>

	<main class="prose">
		<p class="my-4 text-neutral-800">
			Something wrong or just found a typo? <a
				href="https://github.com/Posandu/tronic247/tree/main/posts/{slug}/index.md"
				class="underline"
				target="_blank">Edit this page on GitHub</a
			> and make a PR!
		</p>

		<Comments />
	</main>
</div>
