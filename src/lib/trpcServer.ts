// $lib/trpcServer.ts
import type { inferAsyncReturnType } from '@trpc/server';
import * as trpc from '@trpc/server';
import { getMessages } from './services/message.service';
import { z } from 'zod';

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
	// queries and mutations...
	.query('hello', {
		resolve: () => 'world',
	})
	.query('getMessages', {
		input: z.object({
			channelId: z.number(),
			pageInfo: z.object({
				pageLength: z.number(),
				pageNumber: z.number(),
			}),
		}),
		resolve: (req) => getMessages(req.input.channelId, req.input.pageInfo),
	});

export type Router = typeof router;
