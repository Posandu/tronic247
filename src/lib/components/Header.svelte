<script lang="ts">
	import Icon from '@iconify/svelte';
	import { navigating, page } from '$app/stores';
	import { fly, scale } from 'svelte/transition';
	import { bounceIn, bounceInOut, elasticIn, quadIn } from 'svelte/easing';

	const menuItems = [
		['Home', '/'],
		['Archive', '/archive'],
		['Snippets', '/snippets'],
		['About', '/about'],
		['Sponsor', '/sponsor']
	];

	let mobileMenuOpen = false;

	$: {
		if ($navigating) {
			mobileMenuOpen = false;
		}
	}
</script>

<header
	class="
	fixed
	inset-x-0
	z-50
	w-full
	select-none
	justify-between
	rounded-b-none
	bg-neutral-800
	text-neutral-100
	shadow
	"
>
	<div class="mx-auto flex w-full max-w-4xl justify-center px-4 align-middle">
		<div class="flex min-h-16 flex-1 items-center justify-start">
			<a href="/">
				<img src="/logo.svg" alt="Tronic247 Logo" class="w-44 invert" />
			</a>
		</div>

		<nav class="hidden items-center space-x-4 lg:flex">
			{#each menuItems as [label, link]}
				<a
					href={link}
					class="
						inline-block text-sm font-semibold
								{$page.url.pathname === link ? 'text-primary-light hover:text-primary-hover' : ''}
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
				on:click={() => {
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

<div class="h-[96px]"></div>

{#if mobileMenuOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="fixed rounded-xl px-4 right-[70px] top-[60px] z-50 origin-top-right items-center justify-start bg-neutral-100 shadow-lg py-2 min-w-60 shadow-neutral-900/50 backdrop-blur-lg"
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
		on:click={(e) => {
			if (e.target === e.currentTarget) mobileMenuOpen = false;
		}}
	>
		<button
			class="absolute right-2 top-2 z-50 flex size-8 items-center justify-center rounded-full bg-neutral-200"
			on:click={() => (mobileMenuOpen = false)}
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
