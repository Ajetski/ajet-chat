import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createMessage = (msgInfo: Prisma.MessageCreateInput) =>
	prisma.message.create({
		data: msgInfo,
		include: {
			author: {
				select: {
					id: true,
					username: true,
				},
			}
		}
	});

export const getMessages = (channelId: number, pageInfo: any) =>
	prisma.message.findMany({
		where: {
			channelId,
		},
		include: {
			author: {
				select: {
					id: true,
					username: true,
				},
			},
		},
		orderBy: {
			createdTs: 'desc',
		},
		take: pageInfo.pageLength,
		skip: pageInfo.pageNumber * pageInfo.pageLength,
	});
export type Messages = Awaited<ReturnType<typeof getMessages>>;
