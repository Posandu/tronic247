<script lang="ts">
	import Icon from '@iconify/svelte';
	import { navigating, page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { toggleMode } from 'mode-watcher';

	const menuItems = [
		['Home', '/'],
		['Archive', '/archive']
	];

	let mobileMenuOpen = false;
	let header: HTMLElement;

	let lastScrollPosition = 0;
	let headerOffset = 0;

	const onScroll = () => {
		const topAppBarHeight = header.offsetHeight;
		const currentScrollPosition = Math.max(window.scrollY, 0);
		const diff = currentScrollPosition - lastScrollPosition;

		lastScrollPosition = currentScrollPosition;

		headerOffset -= diff;

		if (headerOffset > 0) {
			headerOffset = 0;
		} else if (Math.abs(headerOffset) > topAppBarHeight) {
			headerOffset = -topAppBarHeight;
		}
	};

	$: {
		if ($navigating) {
			mobileMenuOpen = false;
		}
	}
</script>

<svelte:window on:scroll={onScroll} />

<header
	class="fixed left-1/2 top-0 z-50 mx-auto mb-4 flex w-full -translate-x-1/2 select-none justify-between rounded-b-none bg-white py-2 text-black dark:bg-black/20 dark:text-white dark:backdrop-blur-md"
	style="top: {headerOffset}px;"
	bind:this={header}
>
	<div class="container mx-auto flex">
		<div class="flex min-h-16 flex-1 items-center justify-start">
			<a href="/">
				<img src="/logo.svg" alt="Tronic247 Logo" class="w-44 dark:invert" />
			</a>
		</div>

		<nav class="hidden items-center lg:flex">
			<ul class="flex items-center space-x-6 xl:space-x-8">
				{#each menuItems as [label, link]}
					<li class="relative">
						<a
							href={link}
							class="link-menu
						
						{$page.url.pathname === link ? 'text-primary' : 'hover:text-primary'}
						">{label}</a
						>
					</li>
				{/each}
			</ul>

			<a class="ml-8" href="/search">
				<Icon icon="material-symbols:search" class="size-6 text-black dark:text-white" />
			</a>

			<button class="ml-2 transition-all active:rotate-180" on:click={toggleMode}>
				<Icon icon="lets-icons:color-mode" class="size-6 text-black dark:text-white" />
			</button>
		</nav>

		<div class="flex items-center lg:hidden">
			<a class="mr-4" href="/search">
				<Icon icon="material-symbols:search" class="size-6 text-black dark:text-white" />
			</a>

			<button class="mr-4 transition-all active:rotate-180" on:click={toggleMode}>
				<Icon icon="lets-icons:color-mode" class="size-6 text-black dark:text-white" />
			</button>

			<button class="menu-btn" on:click={() => (mobileMenuOpen = !mobileMenuOpen)}>
				<Icon icon="bx:bx-menu" class="size-6 text-black dark:text-white" />
			</button>
		</div>
	</div>
</header>

<div class="h-[96px]"></div>

{#if mobileMenuOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="fixed inset-0 z-50 flex h-full w-full items-center justify-start bg-black/60 backdrop-blur-lg"
		transition:fly={{ duration: 200, x: -10 }}
		on:click={(e) => {
			if (e.target === e.currentTarget) mobileMenuOpen = false;
		}}
	>
		<div
			class="relative h-full max-h-svh w-full max-w-xl overflow-auto bg-white p-8 shadow-2xl dark:bg-black/20"
		>
			<button
				class="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full hover:bg-black/10"
				on:click={() => (mobileMenuOpen = false)}
			>
				<Icon icon="bx:bx-x" class="size-6" />
			</button>

			<h2 class="mb-4 text-2xl font-bold">Menu</h2>

			<ul class="space-y-4">
				{#each menuItems as [label, link]}
					<li>
						<a href={link} class="link-menu">{label}</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

<style>
	:global(.dark header) {
		mask-image: linear-gradient(
			0deg,
			rgba(0, 0, 0, 0),
			rgba(0, 0, 0, 0.5) 10%,
			rgba(0, 0, 0, 0.8) 20%,
			rgba(0, 0, 0, 1) 30%,
			rgb(0, 0, 0)
		);
	}
</style>
