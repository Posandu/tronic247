<script lang="ts">
	import Snippet from '$lib/components/Snippet.svelte';

	export let data;
</script>

<h1 class="mt-8 text-2xl font-semibold">Snippets</h1>
<p class="mb-10 mt-4">
	Bite sized information, tips and tricks to help you build faster and better.
</p>

<div class="grid grid-cols-2 gap-6">
	{#each new Array(10) as snippet, i}
		<Snippet content={data.content} title={'idk' + i} />
	{/each}
</div>
