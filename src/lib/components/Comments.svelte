<script lang="ts">
	import { onMount } from 'svelte';

	let commentDiv: HTMLElement | undefined = $state();

	const updateUtterances = () => {
		const script = document.createElement('script');
		script.src = 'https://utteranc.es/client.js';
		script.async = true;
		script.setAttribute('repo', 'tronic247/comments');
		script.setAttribute('issue-term', 'title');
		script.setAttribute('theme', 'github-light');
		script.setAttribute('crossorigin', 'anonymous');
		script.setAttribute('label', 'comment');
		commentDiv!.appendChild(script);
	};

	onMount(() => {
		updateUtterances();
	});
</script>

<h2>Comments</h2>

<section
	id="utterances-comments"
	bind:this={commentDiv}
></section>
