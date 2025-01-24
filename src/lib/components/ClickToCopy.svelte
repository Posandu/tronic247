<script>
	/** @type {{val?: string, class?: string}} */
	let { val = '', class: classN = '' } = $props();

	

	let msg = $state('Click to copy');

	const copy = () => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(val);
		} else {
			const el = document.createElement('textarea');
			el.value = val;
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
		}

		msg = 'Copied!';

		setTimeout(() => {
			msg = 'Click to copy';
		}, 2000);
	};
</script>

<button class="btn text-xs {classN}" onclick={copy}>{msg}</button>
