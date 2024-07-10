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
	class="relative -mt-5 overflow-hidden bg-gray-100 pb-16 pt-16 text-center text-white dark:bg-muted-dark/10"
>
	<div class="container relative z-10 mx-auto px-4">
		<h1 class="mb-8 text-4xl font-bold text-black dark:text-white">Tech Thoughts and Code</h1>

		<p class="mx-auto mb-8 max-w-2xl text-base text-black dark:text-white sm:text-lg">
			A blog about software development, programming, and related topics by <a
				href="https://posandu.com"
				class="underline">Posandu</a
			>.
		</p>

		<a href="#recent-posts" class="btn !bg-primary !text-white"> Read Articles </a>
	</div>
</div>

<section class="mx-auto max-w-4xl" id="recent-posts">
	<h2 class="mb-8 ml-4 mt-16 text-2xl font-semibold">Recent Posts</h2>

	{#each posts as { date, title, excerpt, slug, img }}
		<ArticleView {date} {title} {excerpt} {slug} {img} />
	{/each}

	<div class="text-center">
		<a href="/archive/page/2" class="btn inverted mx-auto mt-8"> Check Out More </a>
	</div>
</section>
