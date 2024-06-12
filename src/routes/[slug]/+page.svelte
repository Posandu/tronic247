<script lang="ts">
	import { SITE_URL, formattedTitle } from '$lib';
	import SocialMedia from '$lib/components/SocialMedia.svelte';
	import SvelteSeo from 'svelte-seo';
	import { mode } from 'mode-watcher';
	import Comments from '$lib/components/Comments.svelte';
	import { onMount } from 'svelte';
	
	export let data;

	let tags = data.meta.tags;
	let categories = data.meta.categories;
	let date = data.meta.date;
	let title = data.meta.title;
	let img = data.meta.img;
	let excerpt = data.meta.excerpt.trim() || title;
	let slug = data.meta.slug;

	let Ad: any;

	onMount(() => {
		import('@justinribeiro/lite-youtube');

		import('$lib/components/Advertisement.svelte').then((module) => {
			Ad = module.default;
		});
	});
</script>

<SvelteSeo
	title={formattedTitle(title)}
	description={excerpt}
	canonical={SITE_URL + slug}
	openGraph={{
		title: formattedTitle(title),
		description: excerpt,
		url: SITE_URL + slug,
		type: 'article',
		images: img ? [{ url: img, width: 800, height: 600, alt: 'Article Image' }] : [],
		locale: 'en_US',
		site_name: 'Tronic247'
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@posandu',
		title: formattedTitle(title),
		description: excerpt,
		image: img,
		imageAlt: 'Article Image'
	}}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'Article',
		name: title,
		description: excerpt,
		url: SITE_URL + slug,
		image: img
	}}
/>

<main class="prose prose-gray mx-auto mt-8 dark:prose-invert">
	{#if img}
		<img
			src={img}
			alt="Random"
			class="mb-10 w-full transform-gpu object-cover will-change-transform"
		/>
	{/if}

	<div class="mb-4 text-sm font-semibold uppercase text-black/60 dark:text-muted-dark">
		<p class="inline" aria-label="Published on">
			{new Date(date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</p>

		{#if categories}
			<span class="mx-1">•</span>

			<p class="mt-2 inline" aria-label="Categories">
				{#each categories as category, i}
					<a
						class="hover:underline"
						href="/category/{category.toLowerCase()}"
						aria-label="{category} category">{category}</a
					>{i < categories.length - 1 ? ', ' : ''}
				{/each}
			</p>
		{/if}
	</div>

	<h1 class="mb-10 text-4xl font-bold">{title}</h1>

	<svelte:component this={data.content} />

	{#if Ad}
		<svelte:component this={Ad} />
	{/if}

	<div class="mb-4 space-x-2">
		{#if tags}
			{#each tags as tag}
				<a
					href="/tag/{tag.toLowerCase()}"
					class="inline-block rounded-full text-sm uppercase text-gray-900 no-underline transition-all hover:text-black dark:text-muted-dark dark:hover:text-white"
				>
					#{tag}
				</a>
			{/each}
		{/if}
	</div>

	<SocialMedia />

	<h3 class="text-2xl font-semibold">Comments</h3>

	{#key $mode}
		<Comments />
	{/key}
</main>
