import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import { join, resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	root: 'web',
	build: {
		outDir: '../public',
		emptyOutDir: true,
	},
	plugins: [
		svelte({
			preprocess: [sveltePreprocess({ typescript: true })],
		}),
	],
});
