/* eslint-disable @typescript-eslint/no-var-requires */
import sveltePreprocess from "svelte-preprocess";
import node from "@sveltejs/adapter-node";
import { resolve } from 'path';
// import pkg from "./package.json";

/** @type {import('@sveltejs/kit').Config} */
export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess({}),
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: node({
      out: 'dist'
    }),

    vite: {
		resolve: {
			alias: {
				$shared: resolve('../shared')
			}
		}
    },
  },
};
