<script lang="ts">
	import Icon from '@iconify/svelte';
	import ClickToCopy from '$lib/components/ClickToCopy.svelte';
	import { formattedTitle } from '$lib';
	import SvelteSeo from 'svelte-seo';
</script>

<SvelteSeo title={formattedTitle('Sponsor')} description={'Support the development of Tronic247'} />

<div class="relative -mt-4 w-full overflow-hidden bg-pink-600 py-20">
	<h1 class="text-center text-4xl font-black text-white">Sponsor</h1>
	<p class="mt-4 text-center text-2xl text-white">Support the development of Tronic247</p>
</div>

<div class="container mx-auto my-8 grid gap-8 lg:grid-cols-2">
	<div class="col-span-1">
		<h1 class="mb-4 text-lg font-semibold">Why Sponsor?</h1>

		<p class="text-lg">
			Sponsorship is a way to support the development of Tronic247. As it run by a student, it is
			hard to maintain the server and domain costs.
		</p>

		<h1 class="mb-4 mt-8 text-lg font-semibold">What to expect?</h1>

		<p class="text-lg">
			By sponsoring, you will get a chance to advertise your product or service on Tronic247 and its
			other products, have a special article about your product or service, and more benefits.
		</p>
	</div>

	<div class="col-span-1 flex flex-col gap-10 rounded-lg bg-pink-100 p-8 dark:bg-pink-600/10">
		<div>
			<h1 class="mb-4 text-lg font-semibold text-pink-600">Via Crypto</h1>

			<p class="text-lg">The easiest way to sponsor is via crypto. You can sponsor via:</p>

			<ul class="mt-4 w-max space-y-4">
				<li class="flex items-center justify-start text-lg">
					<Icon icon="ri:eth-fill" class="mr-2 size-6" /> ETH
					<ClickToCopy val="0x9486DD60CE06C694aeb36208FD8b8a33225614Af" class="ml-4" />
				</li>

				<li class="flex items-center justify-start text-lg">
					<Icon icon="formkit:solana" class="mr-2 size-6" /> SOL
					<ClickToCopy val="HWFvo1CCgeVwae3E7NvWfpH89mmzReRboKMfqzBWawpa" class="ml-4" />
				</li>
			</ul>
		</div>

		<div>
			<h1 class="mb-4 text-lg font-semibold text-pink-600">Via GitHub Sponsors</h1>

			<iframe
				src="https://github.com/sponsors/Posandu/card"
				title="Sponsor Posandu"
				height="225"
				width="600"
				style="border: 0;"
				class="mt-4 rounded-lg"
			></iframe>
		</div>
	</div>
</div>

<style>
	:global(#tsparticles) {
		position: absolute !important;
		inset: 0 !important;
		right: 0;
		padding: 0;
		margin: 0;
		z-index: 0; /* if you use -1 you have to set to `"window"` the interactivity.detectsOn property */
	}
</style>
