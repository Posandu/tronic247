<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatDate } from '#lib';
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
		href={resolve('/[slug]', { slug })}
		use:ripple={{
			color: color ? `rgba(${color?.join(',')}, 0.4)` : undefined
		}}
		class="bg block h-full min-h-48 w-full overflow-hidden rounded-3xl p-8 shadow-sm transition-all hover:scale-[1.02]"
		style={`background-color: rgba(${color?.join(',')}, 0.3)`}
	>
		{#if img}
			<Img src={img} loading="lazy" class="mb-8 w-full rounded-xl object-cover" />
		{/if}

		<p class="mb-4 text-white uppercase opacity-80">
			{formatDate(date)}
		</p>

		<h2 class="title text-3xl font-semibold text-white">
			{title}
		</h2>

		<p class="mt-4 max-w-xs overflow-hidden text-wrap wrap-break-word text-white opacity-60">
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
