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

<h3 class="text-3xl font-semibold">Comments</h3>

<section id="utterances-comments" bind:this={commentDiv}></section>
