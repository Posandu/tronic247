<script lang="ts">
	let loading = true;
	let root: HTMLElement;
	let codeEditorModule: any;

	import('./CodeEditor').then((mod) => {
		codeEditorModule = mod;
	});

	$: if (codeEditorModule && root) {
		codeEditorModule.Render(root);

		setTimeout(() => {
			loading = false;
		}, 250);
	}

	export let standAlone = false;
</script>

<div
	class="relative h-full w-full overflow-hidden {standAlone
		? '__editor__standAlone h-screen w-screen'
		: ''}"
>
	{#if loading}
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
