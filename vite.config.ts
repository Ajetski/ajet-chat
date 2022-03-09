import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

// https://vitejs.dev/config/
export default defineConfig({
	root: 'web',
	build: {
		outDir: '../public',
	},
	plugins: [
		svelte({
			preprocess: [sveltePreprocess({ typescript: true })],
		}),
	],
});
