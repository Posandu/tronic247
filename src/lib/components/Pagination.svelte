<script lang="ts">
	import { ripple } from 'svelte-ripple-action';

	interface Props {
		totalPages: number;
		currentPage: number;
		urlFn: (page: number) => string;
	}

	let { totalPages, currentPage, urlFn }: Props = $props();
</script>

{#if totalPages > 1}
	<nav class="mb-8 mt-16 flex flex-wrap gap-4">
		{#each Array.from({ length: totalPages || 0 }) as _, i}
			{@const page = i + 1}

			<a
				href={urlFn(page)}
				class="inline-flex size-10 items-center justify-center rounded-full state-layer text-sm font-medium transition-all {currentPage ===
				page
					? 'bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] shadow-elevation-1 state-layer-primary'
					: 'text-[var(--md-sys-color-on-surface-variant)] state-layer-surface hover:bg-[var(--md-sys-color-surface-container-highest)]'}"
				use:ripple
			>
				{page}
			</a>
		{/each}
	</nav>
{/if}
