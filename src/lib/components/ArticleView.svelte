<script lang="ts">
	import { formatDate, makeID } from '$lib';
	import Img from '@zerodevx/svelte-img';
	import { ripple } from 'svelte-ripple-action';

	interface Props {
		slug: string;
		title: string;
		excerpt: string;
		date: Date;
		img?: any;
		class?: string;
		color?: [number, number, number];
	}

	let { slug, title, excerpt, date, img = undefined, class: classes = '', color }: Props = $props();
</script>

<article
	class="
	{classes} col-span-1
	"
>
	<a
		href="/{slug}"
		use:ripple={{
			color: color ? `rgba(${color?.join(',')}, 0.4)` : undefined
		}}
		class="h-full block shadow bg min-h-48 w-full p-8 overflow-hidden rounded-3xl transition-all hover:scale-[1.02]"
		style={`background-color: rgba(${color?.join(',')}, 0.3)`}
	>
		{#if img}
			<Img src={img} loading="lazy" class="object-cover rounded-xl w-full mb-8" />
		{/if}

		<p class="mb-4 uppercase text-white opacity-80">
			{formatDate(date)}
		</p>

		<h2 class="title text-3xl font-semibold text-white">
			{title}
		</h2>

		<p class="mt-4 max-w-xs overflow-hidden text-wrap break-words text-white opacity-60">
			{excerpt}
		</p>
	</a>
</article>

<style>
	.bg {
		background: var(--md-sys-color-surface-container);
	}

	.title {
		color: var(--md-sys-color-on-surface);
		line-height: 40px;
	}
</style>
