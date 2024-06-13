<script lang="ts">
	import TryCode from '$lib/components/TryCode.svelte';
	import { onMount } from 'svelte';

	let id: undefined | string;
	let mounted = false;
	let standAlone: boolean = true;

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		id = urlParams.get('id') || undefined;
		standAlone = urlParams.get('standAlone') ? urlParams.get('standAlone') === 'true' : true;
		mounted = true;
	});
</script>

{#if mounted}
	<TryCode {standAlone} name={id} />
{/if}
