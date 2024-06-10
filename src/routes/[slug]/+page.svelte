<script lang="ts">
	import SocialMedia from '$lib/components/SocialMedia.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let data;

	let tags = data.meta.tags;
	let categories = data.meta.categories;
	let date = data.meta.date;
	let title = data.meta.title;
	let img = data.meta.img;

	let commentDiv: HTMLElement;

	let scriptLoading = true;

	function waitForElm(selector: any) {
		return new Promise((resolve) => {
			if (document.querySelector(selector)) {
				return resolve(document.querySelector(selector));
			}

			const observer = new MutationObserver((mutations) => {
				if (document.querySelector(selector)) {
					observer.disconnect();
					resolve(document.querySelector(selector));
				}
			});

			// If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		});
	}

	const onScriptLoad = () => {
		waitForElm('.utterances-frame').then(() => {
			const el = document.querySelector('.utterances-frame');

			if (el) {
				el.addEventListener('load', () => {
					setTimeout(() => {
						scriptLoading = false;
					}, 100);
				});
			}
		});
	};

	onMount(() => {
		import('@justinribeiro/lite-youtube');

		const script = document.createElement('script');
		script.src = 'https://utteranc.es/client.js';
		script.async = true;
		script.setAttribute('repo', 'tronic247/comments');
		script.setAttribute('issue-term', 'title');
		script.setAttribute('theme', 'github-light');
		script.setAttribute('crossorigin', 'anonymous');
		script.setAttribute('label', 'comment');
		script.onload = onScriptLoad;
		commentDiv.appendChild(script);
	});
</script>

<svelte:head></svelte:head>

<main class="prose prose-gray mx-auto mt-8 dark:prose-invert">
	{#if img}
		<img
			src={img}
			alt="Random"
			class="mb-10 w-full transform-gpu object-cover will-change-transform"
		/>
	{/if}

	<div class="mb-4 text-sm font-semibold uppercase text-black/60 dark:text-muted-dark">
		<p class="inline" aria-label="Published on">
			{new Date(date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</p>

		{#if categories}
			<span class="mx-1">•</span>

			<p class="mt-2 inline" aria-label="Categories">
				{#each categories as category, i}
					<a
						class="hover:underline"
						href="/category/{category.toLowerCase()}"
						aria-label="{category} category">{category}</a
					>{i < categories.length - 1 ? ', ' : ''}
				{/each}
			</p>
		{/if}
	</div>

	<h1 class="mb-10 text-4xl font-bold">{title}</h1>

	<svelte:component this={data.content} />

	<div class="mb-4 h-28 w-full bg-black/20"></div>

	<div class="mb-4 space-x-2">
		{#if tags}
			{#each tags as tag}
				<a
					href="/tag/{tag.toLowerCase()}"
					class="inline-block rounded-full text-sm uppercase text-gray-900 no-underline transition-all hover:text-black"
				>
					#{tag}
				</a>
			{/each}
		{/if}
	</div>

	<SocialMedia />

	<h3 class="text-2xl font-semibold">Comments</h3>

	{#if scriptLoading}
		<p>Loading comments...</p>
	{/if}

	<section id="utterances-comments" bind:this={commentDiv}></section>
</main>
