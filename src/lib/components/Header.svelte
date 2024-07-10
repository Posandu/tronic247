<script lang="ts">
	import Icon from '@iconify/svelte';
	import { navigating, page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { toggleMode } from 'mode-watcher';

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
	left-0
	top-0
	z-50
	mb-4
	w-full
	select-none
	justify-between
	rounded-b-none
	border-b
	bg-white
	text-black
	dark:bg-black/20
	dark:text-white
	dark:backdrop-blur-md
	dark:border-b-black/20

	{$page.route.id === '/' ? 'no-effect dark:!bg-black/40' : ''}
	"
>
	<div class="max-w-4xl px-4 mx-auto flex w-full align-middle justify-center">
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
							class="
								text-sm font-semibold
								{$page.url.pathname === link ? 'text-primary' : 'text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:font-normal'}
						">{label}</a
						>
					</li>
				{/each}
			</ul>

			<a class="ml-8" href="/search">
				<Icon icon="material-symbols:search" class="size-4 text-black dark:text-white" />
			</a>

			<button class="ml-2 transition-all active:rotate-180" on:click={toggleMode}>
				<Icon icon="lets-icons:color-mode" class="size-4 text-black dark:text-white" />
			</button>
		</nav>

		<div class="flex items-center lg:hidden">
			<a class="mr-4" href="/search">
				<Icon icon="material-symbols:search" class="size-4 text-black dark:text-white" />
			</a>

			<button class="mr-4 transition-all active:rotate-180" on:click={toggleMode}>
				<Icon icon="lets-icons:color-mode" class="size-4 text-black dark:text-white" />
			</button>

			<button class="menu-btn" on:click={() => (mobileMenuOpen = !mobileMenuOpen)}>
				<Icon icon="bx:bx-menu" class="size-4 text-black dark:text-white" />
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
	:global(.dark header:not(.no-effect)) {
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
