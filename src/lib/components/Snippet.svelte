<script lang="ts">
	export let title: string;
	export let id = title.toLowerCase().replace(/\s/g, '-');
</script>

<a href="/snippets/{id}" class="mb-2 block hover:underline">
	{title}
</a>
