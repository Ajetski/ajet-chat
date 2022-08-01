// $lib/trpcServer.ts
import type { inferAsyncReturnType } from '@trpc/server';
import * as trpc from '@trpc/server';
import trpcTransformer from 'trpc-transformer';
import { channelRouter } from './channel.router';
import { dmChannelRouter } from './dm-channel.router';
import { dmRouter } from './dm.router';
import { authRouter } from './auth.router';
import { messageRouter } from './message.router';
import { userRouter } from './user.router';

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
	.transformer(trpcTransformer)
	.merge(messageRouter)
	.merge(userRouter)
	.merge(channelRouter)
	.merge(dmChannelRouter)
	.merge(dmRouter)
	.merge(authRouter);

export type Router = typeof router;
