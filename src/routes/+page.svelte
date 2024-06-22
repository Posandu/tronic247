<script lang="ts">
	import { SITE_URL, formattedTitle } from '$lib';
	import ArticleView from '$lib/components/ArticleView.svelte';
	import SvelteSeo from 'svelte-seo';
	//@ts-ignore
	import Cover from '../cover.png?as=run';
	import Img from '@zerodevx/svelte-img';

	export let data;

	let posts = data.posts;
</script>

<SvelteSeo
	title={"Tronic247 - Posandu's Blog"}
	description={'Tronic247 is where I write about software development, programming, and related topics. You can find interesting articles, tutorials, and guides here.'}
	canonical={SITE_URL}
	openGraph={{
		title: "Tronic247 - Posandu's Blog",
		description:
			'Tronic247 is where I write about software development, programming, and related topics. You can find interesting articles, tutorials, and guides here.',
		url: SITE_URL,
		type: 'article',
		images: [
			{
				url: SITE_URL + '/main.png',
				width: 800,
				height: 600,
				alt: 'Main Image'
			}
		],
		locale: 'en_US',
		site_name: 'Tronic247'
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@posandu',
		title: "Tronic247 - Posandu's Blog",
		description:
			'Tronic247 is where I write about software development, programming, and related topics. You can find interesting articles, tutorials, and guides here.',
		image: SITE_URL + '/main.png',
		imageAlt: 'Main Image'
	}}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'Blog',
		name: "Tronic247 - Posandu's Blog",
		description:
			'Tronic247 is where I write about software development, programming, and related topics. You can find interesting articles, tutorials, and guides here.',
		url: SITE_URL
	}}
/>

<div
	class="relative -mt-4 overflow-hidden bg-black/90 pb-20 pt-20 text-center text-white dark:bg-black/20"
>
	<Img
		src={Cover}
		alt="Hero"
		fetchpriority="high"
		loading="eager"
		class="absolute inset-0 h-full w-full object-cover"
	/>

	<div class="absolute inset-0 bg-black/40"></div>

	<div class="container relative z-10 mx-auto">
		<h1 class="mb-10 text-5xl font-semibold">Blog about Software dev</h1>

		<p class="mx-auto max-w-2xl text-xl leading-10">
			Tronic247 is where I write about software development, programming, and related topics. You
			can find interesting articles, tutorials, and guides here.
		</p>
	</div>
</div>

<section class="container mx-auto">
	<h2 class="mb-8 mt-16 text-2xl font-semibold">Recent Posts</h2>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each posts as { date, title, excerpt, slug, img }}
			<ArticleView {date} {title} {excerpt} {slug} {img} />
		{/each}
	</div>

	<a href="/archive/page/2" class="btn mt-8 inline-block"> Older Posts </a>
</section>
