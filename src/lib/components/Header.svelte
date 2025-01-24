<script lang="ts">
	import Icon from '@iconify/svelte';
	import { navigating, page } from '$app/state';
	import { fly, scale } from 'svelte/transition';
	import { bounceIn, bounceInOut, elasticIn, quadIn } from 'svelte/easing';

	const menuItems = [
		['Home', '/'],
		['Snippets', '/snippets'],
		['About', '/about'],
		['Sponsor', '/sponsor']
	];

	let mobileMenuOpen = $state(false);

	$effect(() => {
		if (navigating) {
			mobileMenuOpen = false;
		}
	});

	let isActive = $derived(menuItems.some(([, link]) => page.url.pathname === link));
</script>

<header
	class="
	header
	inset-x-0
	z-50
	w-full
	select-none
	justify-between
	rounded-b-none
	border-b
	border-b-neutral-100
	bg-neutral-50
	"
>
	<div class="mx-auto flex w-full max-w-4xl justify-center px-4 align-middle">
		<div class="flex min-h-16 flex-1 items-center justify-start">
			<a href="/">
				<img src="/logo.svg" alt="Tronic247 Logo" class="w-44" />
			</a>
		</div>

		<nav class="hidden items-center space-x-4 lg:flex">
			{#each menuItems as [label, link]}
				<a
					href={link}
					class="
						inline-block text-sm transition-all
								
						{page.url.pathname === link
						? 'text-neutral-950'
						: isActive
							? 'text-neutral-400 hover:text-neutral-950'
							: 'text-neutral-700 hover:text-neutral-950'}

						"
				>
					{label}
				</a>
			{/each}

			<a href="/search">
				<Icon icon="material-symbols:search" class="size-4" />
			</a>
		</nav>

		<div class="flex items-center justify-end lg:hidden">
			<button
				onclick={() => {
					mobileMenuOpen = !mobileMenuOpen;
				}}
			>
				<Icon icon="bx:bx-menu" class="size-4" />
			</button>

			<a class="ml-4" href="/search">
				<Icon icon="material-symbols:search" class="size-4" />
			</a>
		</div>
	</div>
</header>

{#if mobileMenuOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed right-[70px] top-[60px] z-50 min-w-60 origin-top-right items-center justify-start rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2 shadow-lg shadow-neutral-300/30 backdrop-blur-lg"
		in:scale={{
			duration: 200,
			opacity: 0,
			start: 0.5
		}}
		out:scale={{
			duration: 200,
			opacity: 0,
			start: 0.5
		}}
		onclick={(e) => {
			if (e.target === e.currentTarget) mobileMenuOpen = false;
		}}
	>
		<button
			class="absolute right-2 top-2 z-50 flex size-8 items-center justify-center rounded-full bg-neutral-200"
			onclick={() => (mobileMenuOpen = false)}
		>
			<Icon icon="bx:bx-x" class="size-6" />
		</button>

		<ul class="space-y-4">
			{#each menuItems as [label, link]}
				<li>
					<a href={link} class="link-menu">{label}</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}
