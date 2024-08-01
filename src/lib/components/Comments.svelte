<script lang="ts">
	import { onMount } from 'svelte';
	import { mode } from 'mode-watcher';

	let commentDiv: HTMLElement;

	const updateUtterances = () => {
		const script = document.createElement('script');
		script.src = 'https://utteranc.es/client.js';
		script.async = true;
		script.setAttribute('repo', 'tronic247/comments');
		script.setAttribute('issue-term', 'title');
		script.setAttribute('theme', $mode === 'light' ? 'github-light' : 'dark-blue');
		script.setAttribute('crossorigin', 'anonymous');
		script.setAttribute('label', 'comment');
		commentDiv.appendChild(script);
	};

	onMount(() => {
		updateUtterances();
	});
</script>

<h2>Comments</h2>

<section id="utterances-comments" class="bg-neutral-100 rounded-xl px-4" bind:this={commentDiv}></section>
