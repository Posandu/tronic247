<script lang="ts">
	import { CATEGORY_NAMES } from '$lib/sorting';

	interface Props {
		categories: Set<string>;
	}

	let { categories }: Props = $props();

	/* eslint-disable svelte/no-at-html-tags */
</script>

<footer class="footer mt-10 w-full bg-neutral-950 py-2 text-white">
	<div class="mx-auto mt-10 max-w-4xl px-4">
		<div class="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
			<div class="col-span-1">
				<h3 class="mb-4 text-2xl font-semibold">Links</h3>

				<ul class="space-y-2 font-light text-neutral-400">
					<li>
						<a href="https://twitter.com/posandu" class="mr-2 inline hover:text-white">
							Follow on X (Twitter)
						</a>
					</li>
					<li>
						<a href="/about" class="mr-2 inline hover:text-white"> About </a>
					</li>
					<li>
						<a href="/sponsor" class="mr-2 inline hover:text-white"> Sponsor </a>
					</li>
					<li>
						<a href="https://github.com/Posandu/tronic247" class="mr-2 inline hover:text-white">
							View on GitHub
						</a>
					</li>
					<li>
						<a href="/sitemap.xml" data-sveltekit-reload class="mr-2 inline hover:text-white">
							Sitemap
						</a>
					</li>
					<li>
						<a href="/rss.xml" data-sveltekit-reload class="mr-2 inline hover:text-white">
							RSS Feed
						</a>
					</li>
				</ul>
			</div>

			<div class="col-span-1">
				<h3 class="mb-4 text-2xl font-semibold">Categories</h3>

				{#each [...categories].sort( (i) => (CATEGORY_NAMES.hasOwnProperty(i) ? -1 : 1) ) as category, i}
					<span>
						<a
							href={`/category/${category}`}
							class="mr-1 inline font-light text-neutral-400 hover:text-white"
						>
							{CATEGORY_NAMES[category] || category}
						</a>

						{#if i !== categories.size - 1}
							<span class="mr-1 inline text-neutral-800">•</span>
						{/if}
					</span>
				{/each}
			</div>
		</div>

		<div
			class="mb-10 mt-20 items-center justify-between gap-4 text-sm font-light text-neutral-400 lg:flex"
		>
			<div>
				{@html `<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/">©<span property="dct:title">Tronic247</span> ${new Date().getFullYear()} by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" class="underline" href="https://posandu.com">Posandu</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-flex;">CC BY-NC 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""></a></p>`}
			</div>

			<div class="mt-4 lg:mt-0">
				<a href="https://posandu.com/#contact" class="hover:underline">Contact</a>
			</div>
		</div>
	</div>
</footer>
