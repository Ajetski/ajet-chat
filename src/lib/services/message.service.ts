import { PrismaClient, Message } from '@prisma/client';

const prisma = new PrismaClient();

export const createMessage = (msgInfo: any) =>
	prisma.message.create({
		data: msgInfo,
	});

export const getMessages = (channelId: number, pageInfo: any) =>
	prisma.message
		.findMany({
			where: {
				channelId,
			},
			include: {
				author: true,
			},
			orderBy: {
				createdTs: 'desc',
			},
			take: pageInfo.pageLength,
			skip: pageInfo.pageNumber * pageInfo.pageLength,
		})
		.then((msgs) => msgs.reverse());

export type Messages = Awaited<ReturnType<typeof getMessages>>;
