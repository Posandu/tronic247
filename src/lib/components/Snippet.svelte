<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Portal from 'svelte-portal';

	export let title: string;
	export let id = title.toLowerCase().replace(/\s/g, '-');
	export let content: any;
	export let dialogOpen = false;

	let rand = '';

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
	class="pop col-span-1 rounded-lg border border-gray-200 bg-gray-50 px-6 py-8 shadow-lg transition-all dark:border-muted-dark/20 dark:bg-muted-dark/20"
	id={id + rand}
>
	<a
		href="#{id}"
		on:click|preventDefault={() => {
			rand = Math.random().toString(36).substring(7);
			setTimeout(() => {
				window.location.hash = `#${id}`;

				setTimeout(() => {
					rand = '';
				}, 100);
			}, 100);
		}}
	>
		<h1 class="items-cente mb-4 flex gap-2 text-xl font-semibold">{title}</h1>
	</a>

	<div class="prose overflow-hidden text-wrap break-words dark:prose-invert">
		<svelte:component this={content} />
	</div>
</div>

<Portal target="body">
	{#if dialogOpen}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
			on:click={(e) => {
				if (e.target === e.currentTarget) closeDialog();
			}}
			transition:fade={{ duration: 200 }}
		>
			<div
				class="flex h-screen max-h-[600px] w-full max-w-xl flex-col overflow-y-auto rounded-lg bg-white px-8 py-8 backdrop-blur-lg dark:bg-white/5"
			>
				<div class="max-h-[600px] flex-1 overflow-auto">
					<h1 class="mb-4 text-xl font-semibold">
						{title}
					</h1>

					<div class="prose overflow-hidden text-wrap break-words dark:prose-invert">
						<svelte:component this={content} />
					</div>
				</div>

				<p class="mt-4 text-xs text-gray-500 dark:text-muted-dark">
					Copy the URL from the address bar to share this snippet with others.
				</p>

				<button class="btn mt-4 block w-full" on:click={closeDialog}> Close </button>
			</div>
		</div>
	{/if}
</Portal>
