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
			},
		},
	});

export const getMessages = (channelId: number, pageInfo: any) =>
	prisma.messageChannelMapping.findMany({
		include: {
			message: {
				include: {
					author: {
						select: {
							id: true,
							username: true,
						},
					},
				},
			},
		},
		where: {
			channelId,
		},
		orderBy: {
			message: {
				createdTs: 'desc',
			},
		},
		take: pageInfo.pageLength,
		skip: pageInfo.pageLength * (pageInfo.pageNumber - 1),
	});
export type Messages = Awaited<ReturnType<typeof getMessages>>;
