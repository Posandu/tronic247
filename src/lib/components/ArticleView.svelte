<script lang="ts">
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
	class="{classes} article-box group rounded-[2rem] bg-gray-100/60 p-5 transition-all will-change-transform hover:scale-[1.02] hover:bg-gray-200/60 dark:bg-black/30 dark:hover:bg-black/40"
	aria-labelledby="article-{slug}-title"
	aria-describedby="article-{slug}-desc"
>
	{#if img}
		<a href="/{slug}" aria-label="Read more about {title}">
			<Img
				src={img}
				class="mb-6 w-full rounded-xl object-cover transition-all group-hover:opacity-95"
				alt="{title} image"
				loading="lazy"
			/>
		</a>
	{/if}

	<p
		class="inline min-w-max flex-1 text-sm font-semibold uppercase dark:text-muted-dark"
		aria-label="Published on"
	>
		{new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})}
	</p>

	<a href="/{slug}" aria-labelledby="article-{slug}-title article-{slug}-desc">
		<h2 id="article-{slug}-title" class="mt-4 text-2xl font-semibold">
			{title}
		</h2>

		<p
			id="article-{slug}-desc"
			class="mt-4 overflow-hidden text-wrap break-words text-black/60 dark:text-muted-dark"
		>
			{excerpt}
		</p>
	</a>
</article>
