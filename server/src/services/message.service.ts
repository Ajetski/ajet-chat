import { MessageInfo, PageInfo } from '../../../shared/graphql';
import { PrismaClient, Message } from '../../../shared/prisma';

const prisma = new PrismaClient();

export const createMessage = (msgInfo: MessageInfo) =>
	prisma.message.create({
		data: msgInfo,
	});

export const getMessages = (channelId: number, pageInfo: PageInfo) =>
	prisma.message
		.findMany({
			where: {
				channelId,
			},
			orderBy: {
				createdTs: 'desc',
			},
			take: pageInfo.pageLength,
			skip: pageInfo.pageNumber * pageInfo.pageLength,
		})
		.then((msgs) => msgs.reverse());
