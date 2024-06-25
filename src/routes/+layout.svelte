<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { navigating, page } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';
	import { fade } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import { beforeNavigate } from '$app/navigation';
	import { updated } from '$app/stores';
	import SvelteSeo from 'svelte-seo';
	import { SITE_URL } from '$lib';

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

	const SEO = {
		title: 'Tronic247 - For Seekers of Innovation',
		description: 'Blog about software development, programming, and related topics.',
		canonical: SITE_URL
	};
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<SvelteSeo base={SITE_URL} themeColor="#e51b23" applicationName="Tronic247" />
<SvelteSeo
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		url: SITE_URL,
		name: SEO.title,
		description: SEO.description
	}}
/>

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
