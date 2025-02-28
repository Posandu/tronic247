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
	<a
		href="/{slug}"
		class="relative shadow flex min-h-48 w-full flex-col overflow-hidden rounded-xl bg-base-content transition-all hover:shadow-lg"
	>
		{#if img}
			<Img src={img} loading="lazy" class="h-full w-full object-cover" />
		{/if}


		<div class="z-10 flex h-full flex-col p-8">
			<p class="flex-1 text-sm mb-2 uppercase text-base-light">
				{formatDate(date)}
			</p>

			<h2 class="title max-w-xs text-xl font-semibold text-base-darkest transition-all">
				{title}
			</h2>

			<p
				class="mt-2 max-w-xs overflow-hidden text-wrap break-words text-sm text-base-light transition-all"
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
