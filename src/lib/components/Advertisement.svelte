<script lang="ts">
	import { getAd } from '$lib/ads';
	import { onDestroy, onMount } from 'svelte';

	let ad = getAd();

	let interval: NodeJS.Timeout;

	onMount(() => {
		interval = setInterval(() => {
			ad = getAd();
		}, 10000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<a
	href={ad.url}
	target="_blank"
	rel="noopener noreferrer"
	class="relative mb-4 mt-8 flex w-full items-center gap-4 rounded-lg border px-4 no-underline transition-all hover:bg-muted-dark/5 h-32 active:bg-muted-dark/10 dark:border-muted-dark/20"
>
	{#if ad.img}
		<img src={ad.img} alt={ad.title} class="h-20" />
	{/if}

	<div class="flex-1 text-left">
		<span class="block text-lg font-semibold text-black/60 dark:text-muted-dark">
			{ad.title}
		</span>

		<span class="text-xs font-semibold text-black/60 dark:text-muted-dark">
			{ad.description}
		</span>

		<span class=" mt-2 block w-max text-xs font-semibold">
			{ad.cta}
		</span>
	</div>
</a>
