<script>
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import ArticleView from '$lib/components/ArticleView.svelte';
	import { page } from '$app/stores';

	export let data;

	let { posts, totalPages, page: currentPage, tagName } = data;

	$: {
		posts = data.posts;
		totalPages = data.totalPages;
		currentPage = data.page;
	}
</script>

<h1 class="mt-8 text-2xl font-semibold">
	Posts tagged with <span class="text-primary">#{tagName}</span>
</h1>

<p class="mb-4 mt-4">
	All posts tagged with <span class="text-primary">#{tagName}</span> are listed below.
</p>

{#if totalPages > 1}
	<nav class="mb-8 flex flex-wrap gap-4">
		{#each Array.from({ length: totalPages || 0 }) as _, i}
			{@const page = i + 1}

			<a
				href={`/tag/${tagName}/page/${page}`}
				class="
				
				inline-flex size-8 items-center justify-center rounded-full px-4
				
				py-2 text-sm font-semibold

				text-gray-800 hover:bg-gray-100

				{currentPage === page ? 'bg-primary text-white hover:bg-primary-dark' : ''}
					
					"
				on:click|preventDefault={async () => {
					await goto(`/tag/${tagName}/page/${page}`);
				}}
			>
				{page}
			</a>
		{/each}
	</nav>
{/if}

<div class="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
	{#each posts as { categories, date, title, excerpt, slug, img }}
		<ArticleView {categories} {date} {title} {excerpt} {slug} {img} class="col-span-1" />
	{/each}
</div>
