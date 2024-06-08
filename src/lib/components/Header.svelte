<script>
	import Icon from '@iconify/svelte';
	import { fade, fly } from 'svelte/transition';
	import { navigating } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';

	const menuItems = [
		['Home', '/'],
		['All Articles', '/archive'],
		['Snippets', '/snippets'],
		['HTML', '/category/html'],
		['CSS', '/category/css'],
		['JavaScript', '/category/javascript'],
		[
			'About',
			[
				'about',
				[
					['Services', '/services'],
					['Contact', '/contact']
				]
			]
		],
		['Sponsor 💖', '/sponsor']
	];

	let submenuHovered = false;
	let searchOpen = false;
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
			searchOpen = false;
			mobileMenuOpen = false;
		}
	}
</script>

<header
	class="container sticky top-0 z-50 mx-auto flex justify-between rounded-b-none bg-white py-3 transition-all sm:rounded-b-xl md:rounded-b-xl lg:rounded-b-none"
	style={scrolledAmt > 10 ? `box-shadow: ${subtleShadow}` : ''}
>
	<div class="flex-1">
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
					{#if !hasSubmenu}
						<a href={link} class="link-menu">{label}</a>
					{:else}
						<a href={link[0].toString()} class="link-menu inline-flex items-center justify-center">
							{label}

							<Icon icon="teenyicons:down-outline" class="ml-2 size-4 text-black" />
						</a>

						<div class="absolute">
							{#if submenuHovered}
								<ul
									class="-ml-10 mt-4 min-w-48 space-y-3 rounded-lg bg-gray-900 px-5 py-4 text-white"
									transition:fly={{ y: -10 }}
								>
									{#each link[1] as [subLabel, subLink]}
										<li>
											<a href={subLink} class="link-menu text-white hover:text-white">{subLabel}</a>
										</li>
									{/each}
								</ul>
							{/if}
						</div>
					{/if}
				</li>
			{/each}
		</ul>

		<button class="ml-8" on:click={() => (searchOpen = true)}>
			<Icon icon="material-symbols:search" class="size-6" />
		</button>

		<button class="ml-2 active:rotate-180 transition-all" >
			<Icon icon="lets-icons:color-mode" class="size-6" />
		</button>
	</nav>

	<div class="flex items-center lg:hidden">
		<button class="mr-4" on:click={() => (searchOpen = true)}>
			<Icon icon="material-symbols:search" class="size-6" />
		</button>

		<button class="menu-btn" on:click={() => (mobileMenuOpen = !mobileMenuOpen)}>
			<Icon icon="bx:bx-menu" class="size-6" />
		</button>
	</div>
</header>

{#if searchOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/20"
		transition:fade={{ duration: 200 }}
		on:click={(e) => {
			if (e.target === e.currentTarget) searchOpen = false;
		}}
	>
		<div class="w-full max-w-xl rounded-xl bg-white p-8 shadow-2xl">
			<h2 class="mb-4 text-2xl font-bold">Search</h2>

			<input
				type="text"
				class="w-full rounded-full border-gray-400 hover:border-gray-500 focus:border-primary focus:ring-primary"
				placeholder="Enter search term"
			/>

			<div class="mt-4 flex justify-end space-x-2">
				<button class="btn" on:click={() => (searchOpen = false)}>Close</button>
				<button class="btn">Search</button>
			</div>
		</div>
	</div>
{/if}


{#if mobileMenuOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="fixed inset-0 z-50 flex h-full w-full items-center justify-start bg-black/20"
		transition:fly={{ duration: 200, x: -10 }}
		on:click={(e) => {
			if (e.target === e.currentTarget) mobileMenuOpen = false;
		}}
	>
		<div class="relative h-full max-h-svh w-full max-w-xl overflow-auto bg-white p-8 shadow-2xl">
			<button
				class="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full hover:bg-black/10"
				on:click={() => (mobileMenuOpen = false)}
			>
				<Icon icon="bx:bx-x" class="size-6" />
			</button>

			<h2 class="mb-4 text-2xl font-bold">Menu</h2>

			<ul class="space-y-4">
				{#each menuItems as [label, link]}
					{@const hasSubmenu = typeof link !== 'string'}

					<li>
						{#if !hasSubmenu}
							<a href={link} class="link-menu">{label}</a>
						{:else}
							<a
								href={link[0].toString()}
								class="link-menu inline-flex items-center justify-between"
							>
								{label}
							</a>

							<ul class="mt-2 space-y-2 border-l pl-2">
								{#each link[1] as [subLabel, subLink]}
									<li>
										<a href={subLink} class="link-menu text-gray-800 hover:text-black">{subLabel}</a
										>
									</li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}
