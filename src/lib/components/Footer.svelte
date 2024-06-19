<script lang="ts">
	export let categories: Set<string>;
	export let tags: Set<string>;
</script>

<footer class="mt-10 w-full bg-gray-900 py-10 text-white dark:bg-black/50">
	<div class="container mx-auto">
		<div class="grid gap-10 lg:grid-cols-2">
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

		<div class="mt-20 items-center justify-between gap-4 lg:flex">
			<div>
				{@html `<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/">©<span property="dct:title">Tronic247</span> ${new Date().getFullYear()} by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://posandu.com">Posandu</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-flex;">CC BY-NC 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""></a></p>`}
			</div>

			<div class="mt-4 lg:mt-0">
				<a href="https://posandu.com/#contact">Contact</a>
			</div>
		</div>
	</div>
</footer>
