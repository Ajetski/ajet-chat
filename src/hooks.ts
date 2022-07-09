// src/hooks.ts
import { createContext, responseMeta, router } from '$lib/trpc/server';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';
// create your tRPC router...

export const handle: Handle = async ({ event, resolve }) => {
	const response = await createTRPCHandle({
		// 👈 add this handle
		url: '/trpc',
		router,
		//createContext,
		responseMeta,
		event,
		resolve,
	});

	return response;
};
