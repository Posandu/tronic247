<script lang="ts">
	export let categories: Set<string>;
	export let tags: Set<string>;
</script>

<footer class="mt-10 w-full bg-gray-900 px-4 py-10 text-white dark:bg-black/50">
	<div class="container">
		<div class="grid grid-cols-2 gap-10">
			<div class="col-span-1">
				<h3 class="mb-6 text-lg font-semibold">Categories</h3>

				<ul class="space-y-2 text-muted-dark">
					{#each Array.from(categories) as category}
						<li class="inline-block">
							<a href={`/category/${category}`} class="mr-2 inline hover:text-white">{category}</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="col-span-1">
				<h3 class="mb-6 text-lg font-semibold">Tags</h3>

				<ul class="space-y-2 text-muted-dark">
					{#each Array.from(tags) as tag}
						<li class="inline-block">
							<a href={`/tag/${tag}`} class="mr-2 inline hover:text-white">#{tag}</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="mt-20">
			<div class="flex items-center justify-between">
				<div>
					<p>
						© {new Date().getFullYear()} Tronic247.
						<a href="https://creativecommons.org/licenses/by-nc/2.5/">
							Licensed under CC BY-NC 2.5
						</a>. A blog by
						<a href="https://posandu.com" class="text-primary" target="_blank">Posandu</a>
					</p>
				</div>

				<div>
					<a href="https://posandu.com/#contact">Contact</a>
				</div>
			</div>
		</div>
	</div>
</footer>
