<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import SvelteSeo from 'svelte-seo';

	import { page } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';
	import { SITE_URL } from '$lib';

	import '@fontsource-variable/inter';
	import '../app.css';
	import '@fontsource-variable/inter';
	import { onNavigate } from '$app/navigation';

	$: {
		//@ts-ignore
		if (typeof sa_pageview !== 'undefined') {
			console.log('tracked pageview');

			//@ts-ignore
			sa_pageview($page.url.pathname);
		}
	}

	const BLEED = ['/', '/sponsor', '/about', '/trycode'];
	const BLANK = ['/trycode'];

	const isInside = (path: string) => BLEED.some((bleed) => path === bleed);
	const isBlank = (path: string) => BLANK.some((blank) => path === blank);

	export let data;

	onNavigate((navigation) => {
		//@ts-expect-error
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			//@ts-expect-error
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
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

<ModeWatcher />

{#if !isBlank($page.route?.id?.toString() || '')}
	<Header />
{/if}

{#key data.url}
	<div
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

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	:root::view-transition-old(root) {
		animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out;
	}

	:root::view-transition-new(root) {
		animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in;
	}

	:global(.header) {
		view-transition-name: header;
	}

	:global(.footer) {
		view-transition-name: footer;
	}
</style>
