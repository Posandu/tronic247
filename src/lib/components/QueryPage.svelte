<script lang="ts">
	import type { Post } from '$lib/query';
	import ArticleView from './ArticleView.svelte';
	import Pagination from './Pagination.svelte';

	export let totalPages: number;
	export let currentPage: number;

	export let urlFn: (page: number) => string;

	export let posts: Post[];
</script>

<div class="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
	{#each posts as { date, title, excerpt, slug, img }}
		<ArticleView {date} {title} {excerpt} {slug} {img} class="col-span-1" />
	{/each}
</div>

<Pagination {totalPages} {currentPage} {urlFn} />
