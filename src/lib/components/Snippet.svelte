<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Portal from 'svelte-portal';

	export let title: string;
	export let id = title.toLowerCase().replace(/\s/g, '-');
	export let content: any;
	export let dialogOpen = false;

	const handleHashChange = () => {
		if (typeof window === 'undefined') return;

		dialogOpen = location.hash === `#${id}`;
	};

	const closeDialog = () => {
		dialogOpen = false;

		window.location.hash = '!';
		window.history.pushState(null, '', window.location.pathname);
	};

	onMount(handleHashChange);
</script>

<svelte:window on:hashchange={handleHashChange} on:load={handleHashChange} />

<div
	class="pop col-span-1 rounded-lg border bg-muted-dark/20 px-4 py-3 transition-all dark:border-muted-dark/20"
	{id}
>
	<a href="#{id}">
		<h1 class="items-cente mb-4 flex gap-2 text-xl font-semibold">{title}</h1>
	</a>

	<div class="prose-sm">
		<svelte:component this={content} />
	</div>
</div>

<Portal target="body">
	{#if dialogOpen}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/80"
			on:click={(e) => {
				if (e.target === e.currentTarget) closeDialog();
			}}
			transition:fade={{ duration: 200 }}
		>
			<div
				class="max-h-[80vh] w-full max-w-xl overflow-y-auto rounded-lg bg-white px-8 py-6 backdrop-blur-lg dark:bg-white/5"
			>
				<h1 class="mb-4 text-xl font-semibold">
					{title}
				</h1>

				<div class="prose-sm dark:prose-invert">
					<svelte:component this={content} />
				</div>

				<p class="mt-4 text-xs text-gray-500 dark:text-muted-dark">
					Copy the URL from the address bar to share this snippet with others.
				</p>

				<button class="btn mt-4 block w-full" on:click={closeDialog}> Close </button>
			</div>
		</div>
	{/if}
</Portal>
