// $lib/trpcServer.ts
import type { inferAsyncReturnType } from '@trpc/server';
import * as trpc from '@trpc/server';
import { messageRouter } from './message.router';

// optional
export const createContext = () => {
	// ...
	return {
		/** context data */
	};
};

// optional
export const responseMeta = () => {
	// ...
	return {
		// { headers: ... }
	};
};

export const router = trpc
	.router<inferAsyncReturnType<typeof createContext>>()
	.merge(messageRouter);

export type Router = typeof router;
