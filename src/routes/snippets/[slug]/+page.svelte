<script lang="ts">
	import { formattedTitle } from '$lib';
	import SvelteSeo from 'svelte-seo';

	let { data } = $props();
</script>

<SvelteSeo title={formattedTitle(data.item.title)} />

<div class="prose mx-auto mt-16 px-4">
	<h1 class="title text-4xl font-bold max-w-lg text-left">{data.item.title}</h1>

	{@render data.item.content()}
</div>
