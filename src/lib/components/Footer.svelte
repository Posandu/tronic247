<script lang="ts">
	export let categories: Set<string>;
	export let tags: Set<string>;
</script>

<footer class="mt-10 w-full bg-gray-950 p-4 text-white dark:bg-black/50">
	<div class="container">
		<div class="grid grid-cols-2">
			<div class="col-span-1">
				<h3 class="mb-2 text-lg font-semibold">Categories</h3>

				<ul class="space-y-2">
					{#each Array.from(categories) as category}
						<li class="inline-block">
							<a href={`/category/${category}`} class="mr-2 inline text-sm underline">{category}</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="col-span-1">
				<h3 class="text-lg font-semibold">Tags</h3>

				<ul class="space-y-2">
					{#each Array.from(tags) as tag}
						<li class="inline-block">
							<a href={`/tag/${tag}`} class="mr-2 inline text-sm underline">#{tag}</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="mt-4">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm">
						© {new Date().getFullYear()} Tronic247. All rights reserved. A blog by
						<a href="https://posandu.com" class="text-sm text-primary" target="_blank">Posandu</a>
					</p>
				</div>

				<div>
					<a href="https://posandu.com/#contact" class="text-sm">Contact</a>
				</div>
			</div>
		</div>
	</div>
</footer>
