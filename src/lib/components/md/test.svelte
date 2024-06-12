<script>
	let count = 0;
</script>

<button on:click={() => (count += 1)} class="btn">
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>
