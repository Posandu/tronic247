<script lang="ts">
	import { SITE_URL } from '$lib';
	import ArticleView from '$lib/components/ArticleView.svelte';
	import SvelteSeo from 'svelte-seo';

	let { data } = $props();

	let posts = $derived(data.posts);

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

<section class="mx-auto max-w-5xl px-4" id="recent-posts">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-16">
		{#each posts as { date, title, excerpt, slug, img }}
			<ArticleView {date} {title} {excerpt} {slug} {img} />
		{/each}
	</div>

	<div class="text-center">
		<a href="/archive/page/2" class="btn mx-auto mt-16"> Check Out More </a>
	</div>
</section>
