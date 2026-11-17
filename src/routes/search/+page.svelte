<script lang="ts">
	import { resolve } from '$app/paths';
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
	<form onsubmit={(e) => e.preventDefault()} role="search">
		<input
			type="search"
			name="search"
			bind:value={query}
			placeholder="Search posts..."
			aria-label="Search posts"
			class="mb-8 w-full rounded-full border-transparent bg-(--md-sys-color-surface-container) px-6 py-3 text-base-content placeholder:text-base-light/60 focus:border-transparent focus:ring-2 focus:ring-white/20"
		/>
	</form>

	{#if results.length > 0}
		<div class="flex flex-col gap-3">
			{#each results as post (post.slug)}
				<a
					href={resolve('/[slug]', { slug: post.slug })}
					class="block rounded-2xl bg-(--md-sys-color-surface-container-low) px-6 py-5 transition-colors hover:bg-(--md-sys-color-surface-container-high)"
				>
					<h2 class="title text-xl font-semibold text-base-content">
						{post.title}
					</h2>
				</a>
			{/each}
		</div>
	{:else}
		<p class="mt-4 text-base-light">{query ? 'No results found' : 'Please type something :)'}</p>
	{/if}
</div>
