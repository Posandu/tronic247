<script lang="ts">
	import { Spring } from 'svelte/motion';
	import { slide } from 'svelte/transition';

	let { headings }: { headings: HTMLHeadingElement[] } = $props();
	let headingMap = $derived.by(() => {
		const map = new Map<string, number>();
		headings.forEach((heading, index) => {
			map.set(heading.id, index);
		});
		return map;
	});

	let active = $state(0);
	let next = new Spring(0, {
		stiffness: 0.23,
		damping: 0.51
	});
	let isBottomOpen = $state(false);

	let prevVal = $state(0);
	let nextVal = $state(0);
	let animate = $state(false);
	let scrollY = $state(0);

	function pathInterpolator(t: number): number {
		const p0 = { x: 0, y: 0 };
		const p1 = { x: 0.05, y: 0 };
		const p2 = { x: 0.133333, y: 0.06 };
		const p3 = { x: 0.166666, y: 0.4 };
		const p4 = { x: 0.208333, y: 0.82 };
		const p5 = { x: 0.25, y: 1 };
		const p6 = { x: 1, y: 1 };

		if (t < 0.5) {
			t = t * 2;
			return (
				Math.pow(1 - t, 3) * p0.y +
				3 * Math.pow(1 - t, 2) * t * p1.y +
				3 * (1 - t) * Math.pow(t, 2) * p2.y +
				Math.pow(t, 3) * p3.y
			);
		}
		t = (t - 0.5) * 2;
		return (
			Math.pow(1 - t, 3) * p3.y +
			3 * Math.pow(1 - t, 2) * t * p4.y +
			3 * (1 - t) * Math.pow(t, 2) * p5.y +
			Math.pow(t, 3) * p6.y
		);
	}

	$effect(() => {
		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						active = headingMap.get(entry.target.id) ?? 0;

						if (active === prevVal) return;

						prevVal = active;
						nextVal = active - 1;

						animate = true;

						next.set(100);

						setTimeout(() => {
							animate = false;

							prevVal = active;
							nextVal = active;

							next.set(0);
						}, 150);
					}
				});
			},
			{
				rootMargin: '0px 0px -50%',
				threshold: 0.5
			}
		);

		headings.forEach((heading) => {
			intersectionObserver.observe(heading);
		});
	});
</script>

<svelte:window bind:scrollY />

{#snippet arrow()}
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6">
		><g fill="none" fill-rule="evenodd"
			><path
				d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
			/><path
				fill="currentColor"
				d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"
			/></g
		></svg
	>
{/snippet}

<div
	class="sticky top-4 z-50 w-full origin-center transition-all {scrollY > 350
		? 'scale-100 opacity-100'
		: 'scale-95 opacity-0 '}"
>
	<div
		class="absolute left-1/2 w-[380px] -translate-x-1/2 transform-gpu select-none transition-all {isBottomOpen
			? 'translate-y-4 scale-110 rounded-[50px] shadow-2xl'
			: 'scale-100 rounded-[100px] shadow'} menua text-white"
		style="
    transition-duration: 0.35s;
    animation-timing-function: cubic-bezier(.47,1.64,.41,.8);"
	>
		<button
			class="group {isBottomOpen
				? 'px-8 py-6'
				: 'px-6 py-4'} flex w-full items-center justify-between gap-4 transition-all"
			onclick={() => (isBottomOpen = !isBottomOpen)}
		>
			<div class="relative h-[24px] w-full max-w-[300px] overflow-hidden">
				<div
					class="flex h-full w-full transform-gpu will-change-transform"
					style="transform: translate(0, {animate ? next.current : 0}%);"
				>
					<span class="item" style="top: -100%;">{headings[prevVal]?.textContent}</span>

					<span class="item">
						{headings[nextVal]?.textContent}
					</span>
				</div>
			</div>

			<div
				class="ml-auto flex w-max items-center justify-center opacity-60 transition-all hover:opacity-100 group-hover:opacity-100"
			>
				{@render arrow()}
			</div>
		</button>

		{#if isBottomOpen}
			<div
				class="mb-6 flex max-h-[calc(100vh-110px)] flex-col gap-2 overflow-y-auto px-8 text-sm text-base-light"
				transition:slide={{ easing: pathInterpolator, duration: 250 }}
			>
				{#each headings as heading, index}
					<a
						href={`#${heading.id}`}
						class:text-white={active === index}
						class:opacity-50={active !== index}
						onclick={() => (isBottomOpen = false)}>{heading.textContent}</a
					>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.item {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: clip;
		text-align: left;
	}

	.menua {
		background-color: rgba(6 7 11 / 0.8);
		backdrop-filter: blur(4px);
	}
</style>
