<script lang="ts">
	import { onMount } from 'svelte';

	let loading = true;
	let root: HTMLElement;
	let codeEditorModule: any;

	export let name = 'normal';
	export let standAlone = false;

	let code:
		| {
				files: Record<string, any>;
		  }
		| undefined;

	onMount(async () => {
		try {
			const res = await import(`/codes/${name}.js`);

			code = res.default;
		} catch (error) {
			alert('Error loading code');
		}
	});

	/* @vite-ignore */
	import('./CodeEditor').then((mod) => {
		codeEditorModule = mod;
	});

	$: if (codeEditorModule && root && code) {
		codeEditorModule.Render(root, code.files);

		setTimeout(() => {
			loading = false;
		}, 250);
	}
</script>

<div
	class="relative h-full w-full overflow-hidden {standAlone
		? '__editor__standAlone h-screen w-screen'
		: ''}"
>
	{#if loading || !code}
		<div class="absolute inset-0 z-50 flex h-full w-full items-center justify-center bg-black">
			Loading code editor...
		</div>
	{/if}

	<div class="h-full" bind:this={root}></div>
</div>

<style>
	:global(
			.__editor__standAlone .sp-wrapper,
			.__editor__standAlone .sp-layout,
			.__editor__standAlone .sp-file-explorer,
			.__editor__standAlone .sp-stack
		) {
		height: 100vh !important;
	}
</style>
