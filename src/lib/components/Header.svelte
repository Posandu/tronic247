<script lang="ts">
	import Icon from '@iconify/svelte';
	import { navigating, page } from '$app/state';
	import { scale } from 'svelte/transition';
	import { ripple } from 'svelte-ripple-action';

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
				class="btn-icon text-white hover:text-[var(--md-sys-color-on-surface)]"
				use:ripple
			>
				<Icon icon="material-symbols:search" class="size-5" />
			</a>
		</nav>

		<div class="flex items-center space-x-2 lg:hidden">
			<a
				href="/search"
				aria-label="Search"
				class="btn-icon text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)]"
				use:ripple
			>
				<Icon icon="material-symbols:search" class="size-5" />
			</a>

			<button
				aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={mobileMenuOpen}
				class="btn-icon text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)]"
				onclick={() => {
					mobileMenuOpen = !mobileMenuOpen;
				}}
				use:ripple
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
		class="fixed right-4 top-[70px] z-50 min-w-60 origin-top-right rounded-large border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-high)] shadow-elevation-2 backdrop-blur-lg"
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
			class="btn-icon absolute right-2 top-2 z-50"
			onclick={() => (mobileMenuOpen = false)}
			aria-label="Close menu"
		>
			<Icon icon="material-symbols:close" class="size-5" />
		</button>

		<ul class="space-y-1 p-2 pt-12">
			{#each menuItems as [label, link]}
				<li>
					<a
						href={link}
						class="block px-4 py-3 rounded-medium state-layer state-layer-surface text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-container-highest)] transition-colors"
					>
						{label}
					</a>
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
