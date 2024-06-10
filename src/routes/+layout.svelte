<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { navigating, page } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';

	NProgress.configure({
		// Full list:
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			NProgress.start();
		} else NProgress.done();
	}

	const BLEED = ['/', '/sponsor', '/about'];

	const isInside = (path: string) => BLEED.some((bleed) => path === bleed);

	export let data;
</script>

<ModeWatcher />

<Header />

<div class="blob hidden dark:block"></div>
<div class="mx-auto grow {isInside($page.route?.id?.toString() || '') ? '' : 'container'} w-full">
	<slot></slot>
</div>

<Footer categories={data.stats.categories} tags={data.stats.tags} />

<style>
	:global(.dark) {
		background: #16161e;
	}

	.blob {
		width: 450px;
		height: 450px;
		border-radius: 25rem;
		background: linear-gradient(180deg, #e51b23 0%, rgba(239, 81, 109, 0) 100%),
			radial-gradient(
				94.51% 124.88% at 94.32% 94.43%,
				rgba(65, 244, 255, 0.78) 0%,
				rgba(131, 218, 255, 0.6552) 32.29%,
				rgba(99, 175, 240, 0.3978) 64.06%,
				rgba(43, 90, 211, 0) 100%
			),
			linear-gradient(313.04deg, #341d65 0.93%, #604aea 125.68%);
		background-blend-mode: color, screen, saturation, darken, lighten, multiply;
		filter: blur(100px) opacity(0.3);
		position: absolute;
		top: 0;
		right: 0;
		z-index: -1;
		pointer-events: none;
	}
</style>
