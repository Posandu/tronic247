<script lang="ts">
	import { SITE_URL, formattedTitle } from '$lib';
	import Snippet from '$lib/components/Snippet.svelte';
	import SvelteSeo from 'svelte-seo';

	let { data } = $props();

	let snippets = data.snippets;
</script>

<SvelteSeo
	title={formattedTitle('Snippets')}
	description={'Short and sweet tips and tricks to help you build faster and better.'}
	canonical={SITE_URL + '/snippets'}
	openGraph={{
		title: formattedTitle('Snippets'),
		description: 'Short and sweet tips and tricks to help you build faster and better.',
		url: SITE_URL + '/snippets',
		type: 'article',
		images: [
			{
				url: SITE_URL + '/snippets.png',
				width: 800,
				height: 600,
				alt: 'Snippets Image'
			}
		],
		locale: 'en_US',
		site_name: 'Tronic247'
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@posandu',
		title: formattedTitle('Snippets'),
		description: 'Short and sweet tips and tricks to help you build faster and better.',
		image: SITE_URL + '/snippets.png',
		imageAlt: 'Snippets Image'
	}}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'Article',
		name: 'Snippets',
		description: 'Short and sweet tips and tricks to help you build faster and better.',
		url: SITE_URL + '/snippets'
	}}
/>

<div class="mx-auto max-w-5xl px-4">
	<h1 class="title mx-auto mt-16 max-w-5xl text-4xl font-bold">Snippets</h1>
	<p class="mb-10 mt-4 text-base-light">
		Bite sized information, tips and tricks to help you build faster and better.
	</p>

	{#each snippets as snippet}
		<Snippet title={snippet.title} />
	{/each}
</div>
