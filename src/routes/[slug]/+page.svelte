<script lang="ts">
	import { resolve } from '$app/paths';
	import { SITE_URL, formattedTitle } from '#lib';
	import SvelteSeo from 'svelte-seo';
	import Comments from '#lib/components/Comments.svelte';
	import { onMount } from 'svelte';
	import { CATEGORY_NAMES } from '#lib/sorting.ts';
	import Toc from '#lib/components/TOC.svelte';
	import Img from '@zerodevx/svelte-img';

	let { data } = $props();

	let categories = data.meta.categories;
	let tags = data.meta.tags;
	let date = data.meta.date;
	let title = data.meta.title;
	let img = data.meta.img;
	let excerpt = data.meta.excerpt.trim() || title;
	let slug = data.meta.slug;
	let lastUpdated = data.meta.lastModified;
	let cover = data.cover;

	// Tint taken from the cover image (same colour as the home page card);
	// falls back to the site's primary blue for posts without one.
	const tint = (data.meta.color ?? [118, 156, 223]).join(' ');

	const formatLong = (d: Date | string) =>
		new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

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

<article class="post" style="--tint: {tint}">
	<header class="hero">
		<div
			class="mx-auto grid max-w-5xl items-center gap-10 px-4 pt-12 pb-14 md:pt-16 {cover
				? 'md:grid-cols-[minmax(0,1fr)_minmax(0,420px)]'
				: ''}"
		>
			<div>
				{#if categories && categories.length > 0}
					<div class="mb-5 flex flex-wrap gap-2">
						{#each categories as category (category)}
							<a
								href={resolve('/category/[name]/[...page]', {
									name: category.toLowerCase(),
									page: ''
								})}
								class="chip"
								aria-label="{category} category"
							>
								{CATEGORY_NAMES[category] || category}
							</a>
						{/each}
					</div>
				{/if}

				<h1 class="title max-w-2xl text-4xl font-bold text-balance md:text-5xl">
					{title}
				</h1>

				{#if data.meta.excerpt.trim()}
					<p class="mt-5 max-w-xl text-lg text-white/70">{data.meta.excerpt.trim()}</p>
				{/if}

				<p class="mt-6 text-sm text-white/55">
					{formatLong(date)}
					{#if lastUpdated}
						<span class="mx-1.5 opacity-60">·</span> Updated {formatLong(lastUpdated)}
					{/if}
				</p>
			</div>

			{#if cover}
				<Img
					src={cover}
					alt=""
					loading="eager"
					fetchpriority="high"
					class="w-full rounded-2xl object-cover shadow-2xl shadow-black/40"
				/>
			{/if}
		</div>
	</header>

	<main class="post-body mx-auto prose mt-12 prose-invert md:prose-lg">
		<div bind:this={contentEl} class="px-4">
			<data.content />
		</div>

		{#if tags && tags.length > 0}
			<div class="mt-10 flex flex-wrap gap-x-3 gap-y-1 px-4">
				{#each tags as tag (tag)}
					<a
						href={resolve('/tag/[name]/[...page]', { name: tag.toLowerCase(), page: '' })}
						class="tag"
						aria-label="{tag} tag"
					>
						#{tag}
					</a>
				{/each}
			</div>
		{/if}
	</main>

	<div class="mx-auto mt-16 h-px w-full max-w-5xl bg-white/10"></div>

	<div class="post-body mx-auto prose mt-12 px-4 prose-invert md:prose-lg">
		<p class="text-white/80">
			Something wrong or just found a typo? <a
				href="https://github.com/Posandu/tronic247/tree/main/posts/{slug}/index.md"
				target="_blank">Edit this page on GitHub</a
			> and make a PR! Thank you!
		</p>

		<Comments />
	</div>
</article>

<style>
	.post {
		--accent: color-mix(in oklab, rgb(var(--tint)) 55%, white);
	}

	.hero {
		background:
			radial-gradient(120% 90% at 85% 0%, rgb(var(--tint) / 0.35), transparent 70%),
			linear-gradient(to bottom, rgb(var(--tint) / 0.18), transparent);
	}

	.title {
		color: var(--md-sys-color-on-surface);
	}

	.chip {
		border-radius: 9999px;
		padding: 0.25rem 0.75rem;
		font-size: 0.875rem;
		background: rgb(var(--tint) / 0.22);
		color: var(--accent);
		transition: background-color 150ms;
	}
	.chip:hover {
		background: rgb(var(--tint) / 0.35);
	}

	.tag {
		color: var(--accent);
		opacity: 0.85;
	}
	.tag:hover {
		opacity: 1;
	}

	/* Accent colour for links and heading anchors inside the article */
	.post-body {
		--tw-prose-invert-links: var(--accent);
		--tw-prose-invert-bullets: var(--accent);
		--tw-prose-invert-counters: var(--accent);
		--tw-prose-invert-quote-borders: var(--accent);
	}
	.post-body :global(a:not([aria-hidden])) {
		text-decoration-color: color-mix(in oklab, var(--accent) 40%, transparent);
		text-underline-offset: 3px;
		transition: text-decoration-color 150ms;
	}
	.post-body :global(a:not([aria-hidden]):hover) {
		text-decoration-color: var(--accent);
	}
	.post-body :global(:where(h1, h2, h3, h4, h5, h6) a[aria-hidden]) {
		color: var(--accent);
	}
</style>
