import { PrismaClient } from '@prisma/client';
import * as trpc from '@trpc/server';
import { z } from 'zod';
import { login, register, userDataSchema } from '$lib/services/auth.service';

const prisma = new PrismaClient();

export const authRouter = trpc
	.router()
	.mutation('login', {
		input: userDataSchema,
		resolve: async (req) => {
			const user = await login(req.input);
			if (!user) {
				throw new trpc.TRPCError({
					code: 'UNAUTHORIZED',
					message: 'Incorrect Username or Password',
				});
			}
			return user;
		},
	})
	.mutation('register', {
		input: userDataSchema,
		resolve: async (req) => {
			return register(req.input);
		},
	});
