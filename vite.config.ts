import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from '@zerodevx/svelte-img/vite';
import markdown from './src/lib/markdownPlugin.js';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			extensions: ['.svelte', '.md'],
			preprocess: [markdown(), vitePreprocess()],
			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter(),
			prerender: {
				handleEntryGeneratorMismatch: 'warn',
				concurrency: 1
			},
			inspector: {
				toggleKeyCombo: 'meta-shift',
				showToggleButton: 'always',
				toggleButtonPos: 'bottom-right'
			},
			onwarn: (warning, handler) => {
				if (warning.code === 'a11y_no_noninteractive_tabindex') {
					return;
				}
				handler(warning);
			}
		}),
		imagetools()
	],
	server: {
		fs: {
			allow: ['..']
		},
		headers: {
			'Cross-Origin-Embedder-Policy': 'require-corp',
			'Cross-Origin-Opener-Policy': 'same-origin'
		}
	}
});
