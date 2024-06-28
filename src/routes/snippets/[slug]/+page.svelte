<script lang="ts">
	import { formattedTitle } from '$lib';
	import SvelteSeo from 'svelte-seo';

	export let data;
</script>

<SvelteSeo title={formattedTitle(data.item.title)} />

<div class="prose mx-auto mt-8 dark:prose-invert">
	<h1>
		{data.item.title}
	</h1>

	<svelte:component this={data.item.content} />
</div>
