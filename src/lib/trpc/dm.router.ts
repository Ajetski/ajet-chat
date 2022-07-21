import { getDirectMessages } from '$lib/services/dm.service';
import * as trpc from '@trpc/server';
import { z } from 'zod';

export const dmRouter = trpc.router().query('getDirectMessages', {
	input: z.object({
		channelId: z.number().int().positive(),
		pageInfo: z.object({
			pageLength: z.number(),
			pageNumber: z.number(),
		}),
	}),
	resolve: (req) => getDirectMessages(req.input.channelId, req.input.pageInfo),
});
