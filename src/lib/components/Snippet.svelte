<script lang="ts">
	import { resolve } from '$app/paths';
	interface Props {
		title: string;
		id?: any;
	}

	let { title, id = title.toLowerCase().replace(/\s/g, '-') }: Props = $props();
</script>

<a href={resolve('/snippets/[slug]', { slug: id })} class="mb-2 block hover:underline">
	{title}
</a>
