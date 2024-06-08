<script lang="ts">
	import Icon from '@iconify/svelte';

	export let content: any;
</script>

<div class="col-span-1 rounded-xl bg-white lg:border-none border px-6 py-4">
	<h1 class="flex items-center gap-2 text-xl mb-4 font-semibold">
		This is an snipper

		<button class="rounded-full transition-all hover:bg-black/10">
			<Icon icon="material-symbols:link" class="size-6" />
		</button>
	</h1>

	<div class="prose p-0">
        <svelte:component this={content} />
    </div>
</div>
