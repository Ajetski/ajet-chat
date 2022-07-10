import { getUsers } from '$lib/services/users.service';
import * as trpc from '@trpc/server';
import { z } from 'zod';

export const userRouter = trpc.router().query('getUsers', {
	input: z.object({
		pageInfo: z.object({
			pageLength: z.number(),
			pageNumber: z.number(),
		}),
	}),
	resolve: (req) => getUsers(req.input.pageInfo),
});
