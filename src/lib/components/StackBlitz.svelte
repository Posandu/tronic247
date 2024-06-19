<script lang="ts">
	import sdk from '@stackblitz/sdk';
	import { onMount } from 'svelte';

	let render: HTMLElement;

	export let id: string;
	export let openFile: string = '';

	onMount(() => {
		sdk.embedProjectId(render, id, {
			forceEmbedLayout: true,
			theme: 'dark',
			hideNavigation: true,
			height: '460',
			openFile
		});
	});
</script>

<div bind:this={render}></div>
