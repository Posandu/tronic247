<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import SvelteSeo from 'svelte-seo';

	import { page } from '$app/state';
	import { SITE_URL } from '$lib';

	import '@fontsource-variable/ibm-plex-sans';
	import '@fontsource-variable/jetbrains-mono';
	import '../app.css';
	import 'svelte-ripple-action/ripple.css';

	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { afterNavigate, beforeNavigate, onNavigate } from '$app/navigation';

	$effect(() => {
		//@ts-ignore
		if (typeof sa_pageview !== 'undefined') {
			console.log('tracked pageview');

			//@ts-ignore
			if (import.meta.env.PROD) sa_pageview(page.url.pathname);
		}
	});

	const BLEED = ['/', '/sponsor', '/about', '/trycode'];
	const BLANK = ['/trycode'];

	const isInside = (path: string) => BLEED.some((bleed) => path === bleed);
	const isBlank = (path: string) => BLANK.some((blank) => path === blank);

	let { data, children } = $props();

	NProgress.configure({ showSpinner: false });

	beforeNavigate(async () => {
		NProgress.start();
	});

	afterNavigate(async () => {
		NProgress.done();
	});

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

{#if !isBlank(page.route?.id?.toString() || '')}
	<Header />
{/if}

{#key data.url}
	<div
		class="mx-auto grow transform-gpu {isInside(page.route?.id?.toString() || '')
			? ''
			: 'container'} w-full"
	>
		{@render children?.()}
	</div>
{/key}

{#if !isBlank(page.route?.id?.toString() || '')}
	<Footer categories={data.stats.categories} />
{/if}

<style>
	/* compiler breaks if there's no style tag hmm */
</style>
