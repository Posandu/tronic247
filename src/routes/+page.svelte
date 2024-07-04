<script lang="ts">
	import { SITE_URL } from '$lib';
	import ArticleView from '$lib/components/ArticleView.svelte';
	import SvelteSeo from 'svelte-seo';

	export let data;

	let posts = data.posts;

	const SEO = {
		title: 'Tronic247 - For Seekers of Innovation',
		description: 'Blog about software development, programming, and related topics.',
		canonical: SITE_URL,
		image: SITE_URL + '/main.png'
	};
</script>

<SvelteSeo
	title={SEO.title}
	description={SEO.description}
	canonical={SEO.canonical}
	openGraph={{
		title: SEO.title,
		description: SEO.description,
		url: SEO.canonical,
		images: [{ url: SEO.image }]
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@tronic247',
		title: SEO.title,
		description: SEO.description,
		image: SEO.image
	}}
/>

<div class="relative -mt-4 overflow-hidden pb-16 pt-16 text-center text-white">
	<div class="absolute inset-0 bg-black/40"></div>

	<div class="container relative z-10 mx-auto px-4">
		<h1 class="mb-8 text-3xl font-bold sm:text-4xl lg:text-5xl">Tech Thoughts and Code</h1>

		<p class="mx-auto mb-8 max-w-2xl text-base sm:text-lg">
			Welcome to Tronic247. Here, I write about software development, programming, and my
			experiences in tech. Find articles, tutorials, and insights from my ongoing journey.
		</p>

		<a href="#recent-posts" class="btn"> Read Articles </a>
	</div>
</div>

<section class="container mx-auto" id="recent-posts">
	<h2 class="mb-8 mt-16 text-2xl font-semibold">Recent Posts</h2>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each posts as { date, title, excerpt, slug, img }}
			<ArticleView {date} {title} {excerpt} {slug} {img} />
		{/each}
	</div>

	<div class="text-center">
		<a href="/archive/page/2" class="btn inverted mx-auto mt-8"> Check Out More </a>
	</div>
</section>
