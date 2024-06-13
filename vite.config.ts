import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
	plugins: [
		ViteImageOptimizer({
			includePublic: true,
			png: {
				quality: 10
			},
			jpeg: {
				quality: 10
			},
			jpg: {
				quality: 10
			}
		}),
		sveltekit()
	],
	server: {
		fs: {
			allow: ['..']
		}
	}
});
