<script lang="ts">
	import Snippet from '$lib/components/Snippet.svelte';

	export let data;
</script>

<h1 class="mt-8 text-2xl font-semibold">Snippets</h1>
<p class="mb-10 mt-4">
	Bite sized information, tips and tricks to help you build faster and better.
</p>

<div class="lg:-m-8 grid gap-10 rounded-2xl bg-gray-50 lg:p-8 lg:grid-cols-2">
	{#each new Array(10) as snippet}
		<Snippet content={data.content} />
	{/each}
</div>
