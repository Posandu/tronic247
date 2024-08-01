<script lang="ts">
	import { formatDate } from '$lib';
	import Img from '@zerodevx/svelte-img';

	export let slug: string;
	export let title: string;
	export let excerpt: string;
	export let date: Date;
	export let img: any = undefined;

	let classes = '';

	export { classes as class };
</script>

<article
	class="
	{classes} 
	
	article-box rounded-xl group
	"
>
	<a href="/{slug}" class="flex flex-col">
		<p class="mb-2 block min-w-max flex-1 text-xs font-semibold uppercase text-neutral-500">
			{formatDate(date)}
		</p>

		{#if img}
			<Img src={img} loading="lazy" class="mb-4 w-full group-hover:opacity-80 transition-all rounded-lg" />
		{/if}

		<h2 class="text-xl font-semibold">
			{title}
		</h2>

		<p class="mt-2 overflow-hidden text-wrap break-words text-sm text-neutral-500">
			{excerpt}
		</p>
	</a>
</article>
