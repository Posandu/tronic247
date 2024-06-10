<script lang="ts">
	import ArticleView from '$lib/components/ArticleView.svelte';

	export let data;

	let posts = data.posts;
	let stats = data.stats;

	const numToWord = (num: number) =>
		Intl.NumberFormat('en-US', {
			style: 'decimal',
			notation: 'compact'
		}).format(num);
</script>

<div class="-mt-4 bg-black dark:bg-black/20 pb-20 pt-20 text-center text-white">
	<div class="container mx-auto">
		<h1 class="mb-6 text-3xl font-semibold">Blog about Software dev</h1>

		<p class="mx-auto max-w-2xl">
			Tronic247 is where I write about software development, programming, and related topics. You
			can find interesting articles, tutorials, and guides here.
		</p>

		<p class="mt-10 text-white/60">
			The blog contains {numToWord(stats.charCount)} characters written in {stats.postCount} posts.
		</p>
	</div>
</div>

<section class="container mx-auto">
	<h2 class="mb-4 mt-16 text-2xl font-semibold">Recent Posts</h2>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each posts as { categories, date, title, excerpt, slug, img }}
			<ArticleView {categories} {date} {title} {excerpt} {slug} {img} />
		{/each}
	</div>

	<a href="/archive" class="btn mt-8 inline-block">View the Archive</a>
</section>
