<script lang="ts">
	import type { ResolvedPathname } from '$app/types';
	interface Props {
		totalPages: number;
		currentPage: number;
		urlFn: (page: number) => ResolvedPathname;
	}

	let { totalPages, currentPage, urlFn }: Props = $props();
</script>

{#if totalPages > 1}
	<nav class="mt-16 mb-8 flex flex-wrap gap-4">
		{#each Array.from({ length: totalPages || 0 }, (_, i) => i + 1) as page (page)}
			<!-- urlFn returns a path built with resolve() by the calling page -->
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a
				href={urlFn(page)}
				class="
				
				inline-flex size-4 items-center justify-center rounded-full p-4 text-sm

				{currentPage === page
					? 'hover:bg-primary-dark bg-base-darkest text-white!'
					: 'text-neutral-100 hover:bg-neutral-600'}
				"
			>
				{page}
			</a>
			<!-- eslint-enable svelte/no-navigation-without-resolve -->
		{/each}
	</nav>
{/if}
