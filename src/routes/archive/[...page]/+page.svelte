<script>
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import ArticleView from '$lib/components/ArticleView.svelte';
	import { page } from '$app/stores';
	import Pagination from '$lib/components/Pagination.svelte';

	export let data;

	let { posts, totalPages, page: currentPage } = data;

	$: {
		posts = data.posts;
		totalPages = data.totalPages;
		currentPage = data.page;
	}
</script>

<h1 class="mt-8 text-2xl font-semibold">Archive</h1>

<p class="mb-4 mt-4">Here you can find all the posts that have been published on this blog.</p>

<Pagination {totalPages} {currentPage} urlFn={(page) => `/archive/page/${page}`} />

<div class="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
	{#each posts as { categories, date, title, excerpt, slug, img }}
		<ArticleView {categories} {date} {title} {excerpt} {slug} {img} class="col-span-1" />
	{/each}
</div>
