import { getDmChannels } from '$lib/services/dm-channel.service';
import * as trpc from '@trpc/server';
import { z } from 'zod';

export const dmChannelRouter = trpc.router().query('getDmChannels', {
	input: z.object({
		userId: z.number().int().positive(),
	}),
	resolve: (req) => getDmChannels(req.input.userId),
});
