<script lang="ts">
	export let totalPages: number;
	export let currentPage: number;
	export let urlFn: (page: number) => string;
</script>

{#if totalPages > 1}
	<nav class="mb-8 mt-4 flex flex-wrap gap-4">
		{#each Array.from({ length: totalPages || 0 }) as _, i}
			{@const page = i + 1}

			<a
				href={urlFn(page)}
				class="
				
				size-2 text-sm inline-flex items-center justify-center p-3 rounded-full

				text-gray-800 hover:bg-gray-100

                dark:text-muted-dark

                dark:hover:bg-muted-dark/10

				{currentPage === page
					? 'bg-primary text-white hover:bg-primary-dark dark:text-white dark:hover:bg-primary-dark'
					: ''}
				"
			>
				{page}
			</a>
		{/each}
	</nav>
{/if}
