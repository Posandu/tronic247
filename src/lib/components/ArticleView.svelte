<script lang="ts">
	import { formatDate, makeID } from '$lib';
	import Img from '@zerodevx/svelte-img';

	interface Props {
		slug: string;
		title: string;
		excerpt: string;
		date: Date;
		img?: any;
		class?: string;
	}

	let { slug, title, excerpt, date, img = undefined, class: classes = '' }: Props = $props();
</script>

<article
	class="
	{classes} relative col-span-1 transition-all
	"
>
	<a href="/{slug}" class="hover:shadow-xl transition-all relative flex w-full flex-col overflow-hidden rounded-xl">
		{#if img}
			<Img src={img} loading="lazy" class="h-full w-full object-cover" />
		{/if}

		<div class="bg pointer-events-none absolute inset-0 mix-blend-luminosity transition-all"></div>

		<div class="absolute z-10 flex h-full flex-col p-8">
			<p class="flex-1 text-sm uppercase text-white/50">
				{formatDate(date)}
			</p>

			<h2 class="title max-w-xs text-xl font-semibold text-white transition-all">
				{title}
			</h2>

			<p
				class="mt-2 max-w-xs overflow-hidden text-wrap break-words text-sm text-white/75 transition-all"
			>
				{excerpt}
			</p>
		</div>
	</a>
</article>

<style>
	.bg {
		background: rgb(12 9 23 / 84%);
	}

	.title {
		letter-spacing: -0.86px;
	}
</style>
