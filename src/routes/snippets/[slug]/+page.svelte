<script lang="ts">
	import { formattedTitle } from '$lib';
	import SvelteSeo from 'svelte-seo';

	let { data } = $props();
</script>

<SvelteSeo title={formattedTitle(data.item.title)} />

<div class="prose mx-auto mt-8 max-w-3xl px-4">
	<h1>
		{data.item.title}
	</h1>

	{@render data.item.content()}
</div>
