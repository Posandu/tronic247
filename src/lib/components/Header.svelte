<script>
	import Icon from '@iconify/svelte';
	import { fade, fly } from 'svelte/transition';
	import { navigating } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';

	const menuItems = [
		['Home', '/'],
		['All Articles', '/archive'],
		['Snippets', '/snippets'],
		['Sponsor 💖', '/sponsor']
	];

	let submenuHovered = false;
	let mobileMenuOpen = false;
	let scrolledAmt = 0;

	const isWindow = typeof window !== 'undefined';

	const checkScroll = () => {
		scrolledAmt = window.scrollY;
	};

	const subtleShadow = '0 0 30px rgba(0,0,0,0.05)';

	onMount(() => {
		if (!isWindow) return;

		window.addEventListener('scroll', checkScroll);
	});

	onDestroy(() => {
		if (!isWindow) return;

		window.removeEventListener('scroll', checkScroll);
	});

	$: {
		if ($navigating) {
			mobileMenuOpen = false;
		}
	}
</script>

<header
	class="container sticky top-0 z-50 mx-auto flex justify-between rounded-b-none bg-white py-3 transition-all sm:rounded-b-xl md:rounded-b-xl lg:rounded-b-none"
	style={scrolledAmt > 10 ? `box-shadow: ${subtleShadow}` : ''}
>
	<div class="flex min-h-12 flex-1 items-center justify-start">
		<a href="/">
			<img src="/logo.svg" alt="Tronic247 Logo" class="w-44" />
		</a>
	</div>

	<nav class="hidden items-center lg:flex">
		<ul class="flex items-center space-x-6 xl:space-x-8">
			{#each menuItems as [label, link]}
				{@const hasSubmenu = typeof link !== 'string'}

				<li
					class="relative"
					on:mouseenter={() => {
						if (hasSubmenu) submenuHovered = true;
					}}
					on:mouseleave={() => {
						if (hasSubmenu) submenuHovered = false;
					}}
				>
					<a href={link} class="link-menu">{label}</a>
				</li>
			{/each}
		</ul>

		<a class="ml-8" href="/search">
			<Icon icon="material-symbols:search" class="size-6" />
		</a>

		<button class="ml-2 transition-all active:rotate-180">
			<Icon icon="lets-icons:color-mode" class="size-6" />
		</button>
	</nav>

	<div class="flex items-center lg:hidden">
		<a class="mr-4" href="/search">
			<Icon icon="material-symbols:search" class="size-6" />
		</a>

		<button class="menu-btn" on:click={() => (mobileMenuOpen = !mobileMenuOpen)}>
			<Icon icon="bx:bx-menu" class="size-6" />
		</button>
	</div>
</header>
