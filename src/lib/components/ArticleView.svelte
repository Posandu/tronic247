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
	class="{classes} rounded-lg article-box group py-4 px-4 flex overflow-hidden hover:bg-gray-100 dark:hover:bg-black/20"
>
	<div class="w-[110px] max-w-[110px] items-start pt-1 hidden md:flex">
		<p class="inline min-w-max flex-1 text-xs font-semibold uppercase text-gray-500">
			{formatDate(date)}
		</p>
	</div>

	<a href="/{slug}" class="flex-1">
		<p class="md:hidden block min-w-max mb-2 flex-1 text-xs font-semibold uppercase text-gray-500">
			{formatDate(date)}
		</p>

		<h2 class="text-xl font-semibold">
			{title}
		</h2>

		<p
			class="mt-2 overflow-hidden text-wrap break-words text-sm text-black/60 dark:text-muted-dark"
		>
			{excerpt}
		</p>

		<p class="mt-4 text-sm font-semibold text-primary">
			Read more
		</p>
	</a>


	{#if img}
		<div class="flex-shrink-0 w-[110px] h-[110px] ml-4">
			<Img
				src={img}
				loading="lazy"
				class="rounded-lg"
			/>
		</div>
	{/if}
</article>
