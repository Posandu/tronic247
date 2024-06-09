<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<button
	class="social-media-btn"
	on:click={() => {
		window.open('https://twitter.com/intent/tweet?url=' + window.location.href);
	}}
>
	<Icon icon="akar-icons:twitter-fill" />
</button>

<button
	class="social-media-btn"
	on:click={() => {
        window.open('https://www.reddit.com/submit?url=' + window.location.href);
	}}
>
	<Icon icon="akar-icons:reddit-fill" />
</button>

<button
	class="social-media-btn"
	on:click={() => {
		window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href);
	}}
>
	<Icon icon="ic:baseline-facebook" />
</button>

<style lang="postcss">
	.social-media-btn {
		@apply inline-flex size-10 items-center justify-center rounded-full text-lg transition-all;
	}
	.social-media-btn:hover {
		@apply bg-gray-100;
	}

	.social-media-btn:active {
		@apply scale-95;
	}
</style>
