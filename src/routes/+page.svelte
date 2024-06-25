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

<div
	class="relative -mt-4 overflow-hidden bg-black/90 pb-20 pt-20 text-center text-white dark:bg-black/20"
>
	<div class="absolute inset-0 bg-black/40"></div>

	<div class="container relative z-10 mx-auto">
		<h1 class="mb-10 text-5xl font-semibold">For Seekers of Innovation</h1>

		<p class="mx-auto max-w-2xl text-xl leading-10">
			Tronic247 is where I write about software development, programming, and related topics. You
			can find interesting articles, tutorials, and guides here. Enjoy your stay!
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
