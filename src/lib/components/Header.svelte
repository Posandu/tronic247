<script>
	import Icon from '@iconify/svelte';
	import { navigating } from '$app/stores';

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
</script>

<header
	class="container z-50 mx-auto mb-4 flex justify-between rounded-b-none bg-black py-3 text-white transition-all sm:rounded-b-xl md:rounded-b-xl lg:rounded-b-none"
>
	<div class="flex min-h-16 flex-1 items-center justify-start">
		<a href="/">
			<img src="/logo.svg" alt="Tronic247 Logo" class="w-44 invert" />
		</a>
	</div>

	<nav class="hidden items-center lg:flex">
		<ul class="flex items-center space-x-6 xl:space-x-8">
			{#each menuItems as [label, link]}
				<li class="relative">
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
