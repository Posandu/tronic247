<script lang="ts">
	interface Props {
		totalPages: number;
		currentPage: number;
		urlFn: (page: number) => string;
	}

	let { totalPages, currentPage, urlFn }: Props = $props();
</script>

{#if totalPages > 1}
	<nav class="mb-8 mt-4 flex flex-wrap gap-4">
		{#each Array.from({ length: totalPages || 0 }) as _, i}
			{@const page = i + 1}

			<a
				href={urlFn(page)}
				class="
				
				inline-flex size-2 items-center justify-center rounded-full p-3 text-sm

				{currentPage === page
					? 'bg-primary-active !text-white hover:bg-primary-dark'
					: 'text-neutral-800 hover:bg-neutral-200'}
				"
			>
				{page}
			</a>
		{/each}
	</nav>
{/if}
