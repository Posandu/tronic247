<script lang="ts">
	import Before from '$lib/images/timetable/before.png';
	import After from '$lib/images/timetable/after.png';
	import { fade } from 'svelte/transition';
	import { ripple } from 'svelte-ripple-action';

	let viewing = $state(true);
</script>

<div class="flex justify-center">
	<button use:ripple class="btn w-40 mx-auto my-4 mb-0" onclick={() => (viewing = !viewing)}>
		{viewing ? 'View After' : 'View Before'}
	</button>
</div>

<div class="w-full relative h-[400px] overflow-hidden">
	{#if viewing}
		<img
			src={Before}
			alt="Before"
			transition:fade={{
				duration: 200
			}}
			class="size-full absolute object-cover"
		/>
	{:else}
		<img
			src={After}
			alt="After"
			transition:fade={{
				duration: 200
			}}
			class="size-full absolute object-cover"
		/>
	{/if}
</div>

<p class="text-white text-center text-sm">
	{viewing
		? 'The Excel file with the timetable'
		: 'How Google Calendar looks like after importing the events'}
</p>
