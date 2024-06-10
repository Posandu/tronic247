<script lang="ts">
	export let slug: string;
	export let title: string;
	export let categories: string[] = [];
	export let excerpt: string;
	export let date: Date;
	export let img: string | undefined = undefined;

	let classes = '';

	export { classes as class };
</script>

<article
	class="{classes} article-box -m-4 rounded-lg p-4 transition-all hover:bg-black/20"
	aria-labelledby="article-{slug}-title"
	aria-describedby="article-{slug}-desc"
>
	{#if img}
		<a href="/{slug}" aria-label="Read more about {title}">
			<img
				src={img}
				class="w-full rounded-xl object-cover transition-all"
				alt="{title} image"
				loading="lazy"
			/>
		</a>
	{/if}

	<div
		class="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase text-black/60 dark:text-muted-dark"
		style="flex: 1 0 auto; 
"
	>
		<p class="inline" aria-label="Published on">
			{new Date(date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</p>

		{#if categories.length > 0}
			<span class="mx-1">•</span>

			<p class="inline" aria-label="Categories">
				{#each categories as category, i}
					<a
						class="hover:underline"
						href="/category/{category.toLowerCase()}"
						aria-label="{category} category"
					>
						{category}{i < categories.length - 1 ? ', ' : ''}
					</a>
				{/each}
			</p>
		{/if}
	</div>

	<a href="/{slug}" aria-labelledby="article-{slug}-title article-{slug}-desc">
		<h2 id="article-{slug}-title" class="mt-4 text-2xl font-semibold dark:opacity-90">
			{title}
		</h2>

		<p id="article-{slug}-desc" class="mt-4 text-black/60 dark:text-muted-dark">{excerpt}</p>
	</a>
</article>
