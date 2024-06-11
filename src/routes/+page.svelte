<script lang="ts">
	import ArticleView from '$lib/components/ArticleView.svelte';

	export let data;

	let posts = data.posts;
</script>

<div
	class="relative -mt-4 overflow-hidden bg-black/90 pb-20 pt-20 text-center text-white dark:bg-black/20"
>
	<img
		src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
		alt="Hero"
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
		{#each posts as { categories, date, title, excerpt, slug, img }}
			<ArticleView {categories} {date} {title} {excerpt} {slug} {img} />
		{/each}
	</div>

	<a href="/archive/page/2" class="btn mt-8 inline-block"> Older Posts </a>
</section>
