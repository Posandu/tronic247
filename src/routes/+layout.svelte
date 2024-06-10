<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { navigating, page } from '$app/stores';

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

<Header />

<div class="mx-auto grow {isInside($page.route?.id?.toString() || '') ? '' : 'container'} w-full">
	<slot></slot>
</div>

<Footer categories={data.stats.categories} tags={data.stats.tags} />
