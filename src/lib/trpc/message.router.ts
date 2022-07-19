import { createMessage, getMessages } from '$lib/services/message.service';
import * as trpc from '@trpc/server';
import { z } from 'zod';

export const messageRouter = trpc
	.router()
	.query('getMessages', {
		input: z.object({
			channelId: z.number(),
			pageInfo: z.object({
				pageLength: z.number(),
				pageNumber: z.number(),
			}),
		}),
		resolve: (req) => getMessages(req.input.channelId, req.input.pageInfo),
	})
	.mutation('createMessage', {
		input: z.object({
			msgInfo: z.object({
				text: z.string(),
				author: z.object({
					connect: z.object({
						id: z.number().int(),
					}),
				}),
				directMessage: z
					.object({
						create: z.object({
							channel: z.object({
								connect: z.object({
									id: z.number().positive(),
								}),
							}),
						}),
					})
					.optional(),
				channelMessage: z
					.object({
						create: z.object({
							channel: z.object({
								connect: z.object({
									id: z.number().positive(),
								}),
							}),
						}),
					})
					.optional(),
			}),
		}),
		resolve: (req) => createMessage(req.input.msgInfo),
	});
