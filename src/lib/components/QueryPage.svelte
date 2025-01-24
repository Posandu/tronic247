<script lang="ts">
	import type { Post } from '$lib/query';
	import ArticleView from './ArticleView.svelte';
	import Pagination from './Pagination.svelte';

	type PostWithoutContent = Omit<Post, 'content'>;

	interface Props {
		totalPages: number;
		currentPage: number;
		urlFn: (page: number) => string;
		posts: PostWithoutContent[];
	}

	let { totalPages, currentPage, urlFn, posts }: Props = $props();
</script>

<div class="articles">
	{#each posts as { date, title, excerpt, slug, img }}
		<ArticleView {date} {title} {excerpt} {slug} {img} class="col-span-1" />
	{/each}
</div>

<Pagination {totalPages} {currentPage} {urlFn} />
