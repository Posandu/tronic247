<script lang="ts">
	export let href = '';
</script>

{#if !href}
	<button class="btn">
		<slot></slot>
	</button>
{:else}
	<a class="btn" {href}>
		<slot></slot>
	</a>
{/if}
