import { PageInfo } from './../schemas';
import { getChannels, getChannelById } from '$lib/services/channel.service';
import * as trpc from '@trpc/server';
import { z } from 'zod';

export const channelRouter = trpc
	.router()
	.query('getChannels', {
		input: z.object({
			pageInfo: PageInfo,
		}),
		resolve: (req) => getChannels(req.input.pageInfo),
	})
	.query('getChannelById', {
		input: z.object({
			channelId: z.number(),
		}),
		resolve: async (req) => {
			const channel = await getChannelById(req.input.channelId);
			if (!channel) {
				throw new trpc.TRPCError({
					code: 'NOT_FOUND',
					message: `Channel with id ${req.input.channelId} not found`,
				});
			}
			return channel;
		},
	});
