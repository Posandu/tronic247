<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

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

<div class="pop col-span-1 rounded-lg border px-4 py-3 transition-all" {id}>
	<a href="#{id}">
		<h1 class="items-cente mb-4 flex gap-2 text-xl font-semibold">{title}</h1>
	</a>

	<div class="prose-sm">
		<svelte:component this={content} />
	</div>
</div>

{#if dialogOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
		on:click={(e) => {
			if (e.target === e.currentTarget) closeDialog();
		}}
		transition:fade={{ duration: 200 }}
	>
		<div class="max-h-[80vh] w-96 overflow-y-auto rounded-lg bg-white p-4">
			<h1 class="mb-4 text-xl font-semibold">
				{title}
			</h1>

			<div class="prose-sm">
				<svelte:component this={content} />
			</div>

			<p class="mt-4 text-xs text-gray-500">
				Copy the URL from the address bar to share this snippet with others.
			</p>

			<button class="btn mt-4 block w-full" on:click={closeDialog}> Close </button>
		</div>
	</div>
{/if}
