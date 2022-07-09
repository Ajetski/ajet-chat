import { getMessages } from '$lib/services/message.service';
import * as trpc from '@trpc/server';
import { z } from 'zod';

export const messageRouter = trpc.router().query('getMessages', {
	input: z.object({
		channelId: z.number(),
		pageInfo: z.object({
			pageLength: z.number(),
			pageNumber: z.number(),
		}),
	}),
	resolve: (req) => getMessages(req.input.channelId, req.input.pageInfo),
});
