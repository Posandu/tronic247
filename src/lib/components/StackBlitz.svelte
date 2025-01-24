<script lang="ts">
	import sdk from '@stackblitz/sdk';
	import { onMount } from 'svelte';

	let render: HTMLElement | undefined = $state();

	interface Props {
		id: string;
		openFile?: string;
	}

	let { id, openFile = '' }: Props = $props();

	onMount(() => {
		if (!render) return console.error('No render element found');

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
