<script lang="ts">
	import { CATEGORY_NAMES } from '$lib/sorting';

	export let categories: Set<string>;
	export let tags: Set<string>;

	/* eslint-disable svelte/no-at-html-tags */
</script>

<footer class="mt-10 w-full bg-gray-900 py-10 text-white dark:bg-black/50">
	<div class="container mx-auto mt-10">
		<div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
			<div class="col-span-1">
				<h3 class="mb-6 text-3xl font-semibold">Links</h3>

				<ul class="space-y-2 text-muted-dark">
					<li>
						<a href="https://twitter.com/posandu" class="mr-2 inline text-lg hover:text-white">
							Follow on X (Twitter)
						</a>
					</li>
					<li>
						<a href="/about" class="mr-2 inline text-lg hover:text-white"> About </a>
					</li>
					<li>
						<a href="/sponsor" class="mr-2 inline text-lg hover:text-white"> Sponsor </a>
					</li>
					<li>
						<a
							href="https://github.com/Posandu/tronic247"
							class="mr-2 inline text-lg hover:text-white"
						>
							View on GitHub
						</a>
					</li>
					<li>
						<a
							href="/sitemap.xml"
							data-sveltekit-reload
							class="mr-2 inline text-lg hover:text-white"
						>
							Sitemap
						</a>
					</li>
					<li>
						<a href="/rss.xml" data-sveltekit-reload class="mr-2 inline text-lg hover:text-white">
							RSS Feed
						</a>
					</li>
				</ul>
			</div>

			<div class="col-span-1">
				<h3 class="mb-6 text-3xl font-semibold">Categories</h3>

				<ul class="space-y-2 text-muted-dark">
					{#each [...categories].sort( (i) => (CATEGORY_NAMES.hasOwnProperty(i) ? -1 : 1) ) as category}
						<li>
							<a href={`/category/${category}`} class="mr-2 inline text-lg hover:text-white">
								{CATEGORY_NAMES[category] || category}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="col-span-1">
				<h3 class="mb-6 text-3xl font-semibold">Tags</h3>

				<ul class="space-y-2 text-muted-dark">
					{#each [...tags] as tag}
						<li class="inline">
							<a href={`/tag/${tag}`} class="mr-2 inline text-lg hover:text-white">#{tag}</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="mt-20 items-center justify-between gap-4 text-lg lg:flex">
			<div>
				{@html `<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/">©<span property="dct:title">Tronic247</span> ${new Date().getFullYear()} by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" class="underline" href="https://posandu.com">Posandu</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-flex;">CC BY-NC 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""></a></p>`}
			</div>

			<div class="mt-4 lg:mt-0">
				<a href="https://posandu.com/#contact" class="hover:underline">Contact</a>
			</div>
		</div>
	</div>
</footer>
