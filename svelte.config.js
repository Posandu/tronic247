import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import markdown from './src/lib/markdownPlugin.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [markdown(), vitePreprocess()],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			handleEntryGeneratorMismatch: 'warn',
			concurrency: 1
		}
	},
	vitePlugin: {
		inspector: {
			toggleKeyCombo: 'meta-shift',
			showToggleButton: 'always',
			toggleButtonPos: 'bottom-right'
		}
	},
	onwarn: (warning, handler) => {
		if (warning.code.startsWith('a11y-no-noninteractive-tabindex')) {
			return;
		}
		handler(warning);
	}
};

export default config;
