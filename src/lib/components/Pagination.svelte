<script lang="ts">
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
				class="
				
				inline-flex size-4 items-center justify-center rounded-full p-4 text-sm

				{currentPage === page
					? 'bg-base-darkest !text-white hover:bg-primary-dark'
					: 'text-neutral-100 hover:bg-neutral-600'}
				"
			>
				{page}
			</a>
		{/each}
	</nav>
{/if}
