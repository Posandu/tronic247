<script>
	import ArticleView from '$lib/components/ArticleView.svelte';

	export let data;

	const testData = data.posts;
</script>

<div class="grid grid-cols-3 gap-8">
	{#each testData as a}
		<ArticleView {...a} class="col-span-1" />
	{/each}
</div>
