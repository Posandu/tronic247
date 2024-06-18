<script lang="ts">
	import { onMount } from 'svelte';
	import { mode } from 'mode-watcher';

	let commentDiv: HTMLElement;

	let scriptLoading = true;

	function waitForElm(selector: any) {
		return new Promise((resolve) => {
			if (document.querySelector(selector)) {
				return resolve(document.querySelector(selector));
			}

			const observer = new MutationObserver(() => {
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

	const updateUtterances = () => {
		const script = document.createElement('script');
		script.src = 'https://utteranc.es/client.js';
		script.async = true;
		script.setAttribute('repo', 'tronic247/comments');
		script.setAttribute('issue-term', 'title');
		script.setAttribute('theme', $mode === 'light' ? 'github-light' : 'dark-blue');
		script.setAttribute('crossorigin', 'anonymous');
		script.setAttribute('label', 'comment');
		script.onload = onScriptLoad;
		commentDiv.appendChild(script);
	};

	onMount(() => {
		updateUtterances();
	});
</script>

{#if scriptLoading}
	<p>Loading comments...</p>
{/if}

<section id="utterances-comments" bind:this={commentDiv}></section>
