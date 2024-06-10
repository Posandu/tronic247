<script>
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import ArticleView from '$lib/components/ArticleView.svelte';
	import { page } from '$app/stores';
	import Pagination from '$lib/components/Pagination.svelte';

	export let data;

	let { posts, totalPages, page: currentPage, category } = data;

	$: {
		posts = data.posts;
		totalPages = data.totalPages;
		currentPage = data.page;
	}
</script>

<h1 class="mt-8 text-2xl font-semibold">
	Posts in the category <span class="text-primary">{category}</span>
</h1>

<p class="mb-4 mt-4">
	All posts in the category <span class="text-primary">{category}</span> are listed below.
</p>

<Pagination {totalPages} {currentPage} urlFn={(page) => `/category/${category}/page/${page}`} />

<div class="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
	{#each posts as { categories, date, title, excerpt, slug, img }}
		<ArticleView {categories} {date} {title} {excerpt} {slug} {img} class="col-span-1" />
	{/each}
</div>
