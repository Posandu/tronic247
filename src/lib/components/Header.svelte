<script lang="ts">
	import Icon from '@iconify/svelte';
	import { navigating, page } from '$app/state';
	import { scale } from 'svelte/transition';

	const menuItems = [
		['Home', '/'],
		['About', '/about']
	];

	let mobileMenuOpen = $state(false);

	$effect(() => {
		if (navigating) {
			mobileMenuOpen = false;
		}
	});
</script>

<header
	class="
	header
    w-full
    select-none
    transition-all
	duration-200
  "
>
	<div class="mx-auto flex h-20 w-full max-w-5xl items-center justify-between px-4">
		<div class="flex items-center">
			<a href="/" aria-label="Home">
				<img
					src="/logo.svg"
					alt="Tronic247 Logo"
					class="w-36 invert transition-opacity hover:opacity-80 lg:w-44"
				/>
			</a>
		</div>

		<nav class="hidden items-center space-x-6 lg:flex" aria-label="Main navigation">
			{#each menuItems as [label, link]}
				<a
					href={link}
					class="
            
            relative
            text-sm
            font-medium
            transition-colors
			hover:text-neutral-100

			hover:before:!w-full
			hover:before:!bg-white
            {page.url.pathname === link
						? 'text-white before:!w-full before:!bg-white'
						: 'text-base-light'}

			link
          "
				>
					{label}
				</a>
			{/each}

			<a
				href="/search"
				aria-label="Search"
				class="
          rounded-full
          p-2
		  text-white
		  transition-colors
          hover:bg-white
          hover:text-base-darkest
        "
			>
				<Icon icon="material-symbols:search" class="size-5" />
			</a>
		</nav>

		<div class="flex items-center space-x-2 lg:hidden">
			<a
				href="/search"
				aria-label="Search"
				class="
          rounded-full
          p-2
          text-neutral-400
          transition-colors
          hover:bg-neutral-800
          hover:text-neutral-100
        "
			>
				<Icon icon="material-symbols:search" class="size-5" />
			</a>

			<button
				aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={mobileMenuOpen}
				class="
          rounded-full
          p-2
          text-neutral-400
          transition-colors
          hover:bg-neutral-800
          hover:text-neutral-100
        "
				onclick={() => {
					mobileMenuOpen = !mobileMenuOpen;
				}}
			>
				<Icon
					icon={mobileMenuOpen ? 'material-symbols:close' : 'material-symbols:menu'}
					class="size-5"
				/>
			</button>
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

<style>
	.link {
		@apply relative before:absolute
            before:-bottom-1
            before:left-0
            before:h-0.5
            before:w-0
            before:rounded-full
            before:bg-current
            before:transition-all
			before:duration-200;
	}

	.header {
		background-color: var(--md-sys-color-surface-container-low);
	}
</style>
