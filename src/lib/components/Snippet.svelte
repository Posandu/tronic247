<script lang="ts">
	interface Props {
		title: string;
		id?: any;
	}

	let { title, id = title.toLowerCase().replace(/\s/g, '-') }: Props = $props();
</script>

<a href="/snippets/{id}" class="mb-2 block hover:underline">
	{title}
</a>
