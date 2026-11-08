<script lang="ts">
	import Before from '#lib/images/timetable/before.png';
	import After from '#lib/images/timetable/after.png';
	import { fade } from 'svelte/transition';
	import { ripple } from 'svelte-ripple-action';

	let viewing = $state(true);
</script>

<div class="flex justify-center">
	<button use:ripple class="btn mx-auto my-4 mb-0 w-40" onclick={() => (viewing = !viewing)}>
		{viewing ? 'View After' : 'View Before'}
	</button>
</div>

<div class="relative h-[400px] w-full overflow-hidden">
	{#if viewing}
		<img
			src={Before}
			alt="Before"
			transition:fade={{
				duration: 200
			}}
			class="absolute size-full object-cover"
		/>
	{:else}
		<img
			src={After}
			alt="After"
			transition:fade={{
				duration: 200
			}}
			class="absolute size-full object-cover"
		/>
	{/if}
</div>

<p class="text-center text-sm text-white">
	{viewing
		? 'The Excel file with the timetable'
		: 'How Google Calendar looks like after importing the events'}
</p>
