<script>
	import ArticleView from '$lib/components/ArticleView.svelte';

	export let data;

	const { posts } = data;
</script>

<div class="grid grid-cols-3 gap-8">
	{#each posts as { categories, date, title, excerpt, slug, img }}
		<ArticleView {categories} {date} {title} {excerpt} {slug} {img} class="col-span-1" />
	{/each}
</div>
