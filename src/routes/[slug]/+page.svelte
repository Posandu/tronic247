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
	let lastUpdated = data.meta.lastModified;

	let randPosts = data.randPosts;

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

<div class="prose prose-lg mb-8 text-center dark:prose-invert md:prose-xl md:mx-auto">
	{#if data.postImg}
		<div class="relative w-full overflow-hidden">
			<enhanced:img src={data.postImg} alt={title} class="w-full rounded-xl" />
		</div>
	{/if}

	<div
		class="mb-4 text-sm font-semibold uppercase text-black/60 dark:text-muted-dark {img
			? ''
			: '!mt-10'}"
	>
		<p class="inline" aria-label="Published on">
			{new Date(date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</p>

		{#if lastUpdated}
			<span class="mx-1">•</span>

			<p class="inline" aria-label="Last Updated on">
				Updated on {new Date(lastUpdated).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</p>
		{/if}

		{#if categories && categories?.length > 0}
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

	<h1 class="mb-10 !text-4xl font-bold leading-normal">{title}</h1>
</div>

<main class="prose prose-lg mx-4 dark:prose-invert md:prose-xl md:mx-auto">
	<svelte:component this={data.content} />

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

	{#key $mode}
		<Comments />
	{/key}
</main>

<h3 class="mt-10 text-2xl font-semibold">Related Posts</h3>

<div class="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
	{#each randPosts as post}
		<a href={post.slug} class="group col-span-1 no-underline">
			{#if post.img}
				<div class="relative w-full overflow-hidden">
					<enhanced:img src={post.img} alt={post.title} class="w-full rounded-xl" />
				</div>
			{/if}

			<h4 class="mt-4 text-xl font-semibold">{post.title}</h4>
		</a>
	{/each}
</div>
