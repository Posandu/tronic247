<script lang="ts">
	import Fuse from 'fuse.js';

	let { data } = $props();

	let posts = data.posts;
	let query = $state('');
	let results: (typeof posts)[0][] = $state([]);

	const search = () => {
		const fuse = new Fuse(posts, {
			keys: ['title', 'slug'],
			shouldSort: true
		});

		results = fuse.search(query).map((i) => i.item);
	};

	$effect(() => {
		if (query) search();
	});
</script>

<h1 class="title mx-auto mt-16 max-w-5xl px-4 text-4xl font-bold">Search</h1>

<div class="mx-auto mt-8 max-w-5xl px-4">
	<form method="post">
		<input
			type="text"
			name="search"
			bind:value={query}
			placeholder="Search..."
			class="mb-8 w-full rounded-xl border border-neutral-300 px-4 py-2"
		/>
	</form>

	{#if results.length > 0}
		{#each results as post}
			<a
				href="/{post.slug}"
				class="mt-4 block rounded-lg border border-neutral-200 bg-white p-4 hover:bg-neutral-100"
			>
				<h2>
					{post.title}
				</h2>
			</a>
		{/each}
	{:else}
		<p class="mt-4 text-base-light">{query ? 'No results found' : 'Please type something :)'}</p>
	{/if}
</div>
