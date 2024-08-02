<script lang="ts">
	import { formatDate, makeID } from '$lib';
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
	
	article-box relative -mx-4 bg-white/40 px-4 transition-all
	"
>
	<a href="/{slug}" class="flex flex-col">
		{#if img}
			<Img
				src={img}
				loading="lazy"
				class="w-full rounded-xl shadow transition-all"
				id={makeID(slug)}
			/>
		{/if}

		<p class="mb-2 mt-4 block min-w-max flex-1 text-xs font-medium uppercase text-neutral-700">
			{formatDate(date)}
		</p>

		<h2 class="text-lg font-semibold" id={makeID(slug + 'title')}>
			{title}
		</h2>

		<p class="mt-2 overflow-hidden text-wrap break-words text-sm text-neutral-700">
			{excerpt}
		</p>
	</a>
</article>

{@html `${'<'}style>#${makeID(slug)}{view-transition-name:${makeID(slug)};}#${makeID(slug + 'title')}{view-transition-name:${makeID(slug + 'title')};}${'</'}style>`}
