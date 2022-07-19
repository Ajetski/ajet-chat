import * as trpc from '@trpc/server';
import { z } from 'zod';

export const channelRouter = trpc.router().query('loadLogin', {
	resolve: (req) => {},
});
