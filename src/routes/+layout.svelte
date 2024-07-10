<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import NProgress from 'nprogress';
	import SvelteSeo from 'svelte-seo';

	import { navigating, page } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';
	import { fade } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import { SITE_URL } from '$lib';

	import '@fontsource-variable/inter';
	import '../app.css';
	import 'nprogress/nprogress.css';

	$: {
		//@ts-ignore
		if (typeof sa_pageview !== 'undefined') {
			console.log('tracked pageview');

			//@ts-ignore
			sa_pageview($page.url.pathname);
		}
	}

	NProgress.configure({});

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
		href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700"
		rel="stylesheet"
	/>
</svelte:head>

<SvelteSeo themeColor="#e51b23" applicationName="Tronic247" />
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
	<Footer categories={data.stats.categories} />
{/if}
