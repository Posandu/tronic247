<script lang="ts">
	import SocialMedia from '$lib/components/SocialMedia.svelte';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let data;

	let slug = data.post.slug;
	let tags = data.post.tags;
	let categories = data.post.categories;
	let date = data.post.date;
	let title = data.post.title;
	let img = data.post.img;

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

	let scrolledPercentage = 0;
</script>

<svelte:head>
	<title>Adding your discord status to a website | Tronic247</title>
</svelte:head>

<div class="relative z-10 mt-1 text-center sm:mt-12">
	<div class="container prose mx-auto">
		<img
			src="/test.png"
			alt="Random"
			class="w-full transform-gpu object-cover will-change-transform"
		/>
	</div>

	<div class="mb-4 mt-10 text-sm font-semibold uppercase text-black/60">
		<p class="inline" aria-label="Published on">
			{new Date(date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</p>

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
	</div>

	<h1 class="text-4xl font-bold">{title}</h1>
</div>

<main class="container prose prose-gray mx-auto mt-8">
	<div class="mb-4 h-28 w-full bg-black/20"></div>

	<svelte:component this={data.post.content} />

	<div class="mb-4 h-28 w-full bg-black/20"></div>

	<div class="mb-4 space-x-2">
		{#each tags as tag}
			<a
				href="/tags/{tag.toLowerCase()}"
				class="inline-block rounded-full text-sm uppercase text-gray-900 no-underline transition-all hover:text-black"
			>
				#{tag}
			</a>
		{/each}
	</div>

	<SocialMedia />

	<h3 class="text-2xl font-semibold">Comments</h3>

	{#if scriptLoading}
		<p>Loading comments...</p>
	{/if}

	<section id="utterances-comments" bind:this={commentDiv}></section>
</main>

<svelte:window
	on:scroll={() =>
		(scrolledPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight))}
	on:load={() =>
		(scrolledPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight))}
/>

<div class="fixed bottom-10 left-10">
	{#if scrolledPercentage < 0.9}
		<svg
			width="63"
			height="63"
			viewBox="-7.875 -7.875 78.75 78.75"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			style="transform:rotate(-90deg)"
			class="relative overflow-hidden"
			transition:fly={{ y: -10, duration: 200 }}
		>
			<circle
				r="21.5"
				cx="31.5"
				cy="31.5"
				fill="transparent"
				stroke="#e0e0e0"
				stroke-width="7"
				stroke-dasharray="135.02px"
				stroke-dashoffset="0"
			></circle>

			<circle
				r="21.5"
				cx="31.5"
				cy="31.5"
				stroke="#000"
				stroke-width="7"
				stroke-linecap="round"
				stroke-dashoffset={135.02 - scrolledPercentage * 135.02}
				fill="transparent"
				stroke-dasharray="135.02px"
			></circle>
		</svg>
	{/if}
</div>
