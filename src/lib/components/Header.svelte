<script>
	import Icon from '@iconify/svelte';
	import { navigating, page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { toggleMode } from 'mode-watcher';
	import { onMount } from 'svelte';

	const menuItems = [
		['Home', '/'],
		['All Articles', '/archive'],
		['Snippets', '/snippets'],
		['Sponsor 💖', '/sponsor']
	];

	let mobileMenuOpen = false;

	$: {
		if ($navigating) {
			mobileMenuOpen = false;
		}
	}

	let lastScrollPosition = 0;
	let currentAppBarOffsetTop = 0;

	const topAppBarHeight = 90;

	let headerTop = 0;

	const updateScroll = () => {
		const currentScrollPosition = Math.max(window.scrollY, 0);
		const diff = currentScrollPosition - lastScrollPosition;
		lastScrollPosition = currentScrollPosition;

		currentAppBarOffsetTop -= diff;

		if (currentAppBarOffsetTop > 0) {
			currentAppBarOffsetTop = 0;
		} else if (Math.abs(currentAppBarOffsetTop) > topAppBarHeight) {
			currentAppBarOffsetTop = -topAppBarHeight;
		}

		headerTop = currentAppBarOffsetTop;
	};

	onMount(updateScroll);
</script>

<svelte:window on:scroll={updateScroll} />

<header
	class="container mx-auto fixed top-0 left-1/2 -translate-x-1/2 z-50 mb-4 flex select-none justify-between rounded-b-none text-black
	
		shadow-muted-dark/5

		{lastScrollPosition > 30
		? 'h-[90px] bg-white py-0 shadow-xl shadow-muted-dark/5 dark:bg-black/20 dark:backdrop-blur-md'
		: 'h-[108px] '}
		 dark:text-white sm:rounded-b-xl md:rounded-b-xl lg:rounded-b-none"
	style="
				top: {headerTop}px;

				transition: background-color 0.2s, box-shadow 0.2s, padding 0.2s, height 0.2s;
		"
>
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
			<Icon icon="material-symbols:search" class="size-6" />
		</a>

		<button class="ml-2 transition-all active:rotate-180" on:click={toggleMode}>
			<Icon icon="lets-icons:color-mode" class="size-6" />
		</button>
	</nav>

	<div class="flex items-center lg:hidden">
		<a class="mr-4" href="/search">
			<Icon icon="material-symbols:search" class="size-6" />
		</a>

		<button class="mr-4 transition-all active:rotate-180" on:click={toggleMode}>
			<Icon icon="lets-icons:color-mode" class="size-6" />
		</button>

		<button class="menu-btn" on:click={() => (mobileMenuOpen = !mobileMenuOpen)}>
			<Icon icon="bx:bx-menu" class="size-6" />
		</button>
	</div>
</header>

<div class="h-[128px]"></div>

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
