<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { navigating, page } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';
	import { onNavigate } from '$app/navigation';
	import { fade, fly, scale } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import { beforeNavigate } from '$app/navigation';
	import { updated } from '$app/stores';

	beforeNavigate(({ willUnload, to }) => {
		if ($updated && !willUnload && to?.url) {
			location.href = to.url.href;
		}
	});
	
	NProgress.configure({
		// Full list:
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			NProgress.start();
		} else NProgress.done();
	}

	const BLEED = ['/', '/sponsor', '/about', '/trycode'];
	const BLANK = ['/trycode'];

	const isInside = (path: string) => BLEED.some((bleed) => path === bleed);
	const isBlank = (path: string) => BLANK.some((blank) => path === blank);

	export let data;
</script>

<ModeWatcher />

{#if !isBlank($page.route?.id?.toString() || '')}
	<Header />

	<div class="blob hidden dark:block"></div>
{/if}

{#key data.url}
	<div
		in:fade={{ duration: 100, delay: 100, easing: quadInOut }}
		out:fade={{ duration: 100, easing: quadInOut }}
		class="mx-auto grow transform-gpu {isInside($page.route?.id?.toString() || '')
			? ''
			: 'container'} w-full"
	>
		<slot></slot>
	</div>
{/key}

{#if !isBlank($page.route?.id?.toString() || '')}
	<Footer categories={data.stats.categories} tags={data.stats.tags} />
{/if}

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
