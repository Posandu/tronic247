<script lang="ts">
	import { formattedTitle } from '$lib';
	import SvelteSeo from 'svelte-seo';

	export let data;
</script>

<SvelteSeo title={formattedTitle(data.item.title)} />

<div class="prose mx-auto max-w-3xl px-4 mt-8">
	<h1>
		{data.item.title}
	</h1>

	<svelte:component this={data.item.content} />
</div>
