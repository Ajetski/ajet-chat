import { getChannels } from '$lib/services/channel.service';
import * as trpc from '@trpc/server';
import { z } from 'zod';

export const channelRouter = trpc.router().query('getChannels', {
	input: z.object({
		pageInfo: z.object({
			pageLength: z.number(),
			pageNumber: z.number(),
		}),
	}),
	resolve: (req) => getChannels(req.input.pageInfo),
});
