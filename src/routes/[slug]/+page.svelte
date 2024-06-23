<script lang="ts">
	import { SITE_URL, formattedTitle } from '$lib';
	import SvelteSeo from 'svelte-seo';
	import { mode } from 'mode-watcher';
	import Comments from '$lib/components/Comments.svelte';
	import { onMount } from 'svelte';
	import Img from '@zerodevx/svelte-img';

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

	onMount(() => {
		import('@justinribeiro/lite-youtube');
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

<div class="mt-8 md:grid grid-cols-8 gap-8">
	<div class="col-span-6">
		<div class="mb-4 text-sm font-semibold uppercase text-black/60 dark:text-muted-dark">
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

		<h1 class="mb-10 text-4xl font-semibold">{title}</h1>

		<main class="prose dark:prose-invert">
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

			<p class="my-4 text-muted-dark">
				Found a spelling error or something wrong with this article? <a
					href="https://github.com/Posandu/tronic247/tree/main/posts/{slug}/index.md"
					class="underline"
					target="_blank">Edit this page on GitHub</a
				> and make a PR!
			</p>

			{#key $mode}
				<Comments />
			{/key}
		</main>
	</div>

	<div class="col-span-2">
		{#if img}
			<Img src={data.postImg} alt={title} class="ml-auto w-full rounded-lg hidden md:block" />
		{/if}

		<h3 class="mt-10 text-2xl font-semibold">Related</h3>

		<div class="mt-4 space-y-4">
			{#each randPosts as post}
				<a href={post.slug} class="block hover:underline">
					{post.title}
				</a>
			{/each}
		</div>
	</div>
</div>
