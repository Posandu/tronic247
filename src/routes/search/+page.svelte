<script lang="ts">
	import Fuse from 'fuse.js';

	export let data;

	let posts = data.posts;
	let query = '';
	let results: (typeof posts)[0][] = [];

	const search = () => {
		const fuse = new Fuse(posts, {
			keys: ['title', 'slug'],
			shouldSort: true
		});

		results = fuse.search(query).map((i) => i.item);
	};

	$: if (query) search();
</script>

<div class="mx-auto max-w-prose">
	<section class="text-center">
		<h1 class="mt-8 text-2xl font-semibold">Search</h1>

		<p class="mb-4 mt-4">Search the articles</p>
	</section>

	<form method="post">
		<input
			type="text"
			name="search"
			bind:value={query}
			placeholder="Search..."
			class="w-full rounded-full border border-neutral-300 px-4 py-2"
		/>
	</form>

	{#if results.length > 0}
		{#each results as post}
			<a
				href="/{post.slug}"
				class="mt-4 block bg-white rounded-lg border border-neutral-200 p-4 hover:bg-neutral-100"
			>
				<h2>
					{post.title}
				</h2>
			</a>
		{/each}
	{:else}
		<p class="mt-4">No results found</p>
	{/if}
</div>
