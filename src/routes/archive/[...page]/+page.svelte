<script>
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import ArticleView from '$lib/components/ArticleView.svelte';
	import { page } from '$app/stores';

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

<nav class="flex gap-4 mb-8">
	{#each Array(totalPages) as _, i}
		{@const page = i + 1}

		<a
			href={`/archive/page/${page}`}
			class="
				
				inline-flex size-8 items-center justify-center rounded-full px-4
				
				py-2 text-sm font-semibold

				text-gray-800

				{currentPage === page ? 'bg-primary text-white' : ''}
					
					"
			on:click|preventDefault={async () => {
				await invalidate('welp:me');
				await goto(`/archive/page/${page}`);
			}}
		>
			{page}
		</a>
	{/each}
</nav>

<div class="mb-10 grid grid-cols-3 gap-8">
	{#each posts as { categories, date, title, excerpt, slug, img }}
		<ArticleView {categories} {date} {title} {excerpt} {slug} {img} class="col-span-1" />
	{/each}
</div>

{currentPage}
