import { MessageInfo, PageInfo } from '@graphql/types';
import { PrismaClient, Message } from '@prisma/client';

const prisma = new PrismaClient();

export const createMessage = (msgInfo: MessageInfo) =>
	prisma.message.create({
		data: msgInfo,
	});

export const getMessages = (channelId: number, pageInfo: PageInfo) =>
	prisma.message.findMany({
		where: {
			channelId
		},
		orderBy: {
			createdTs: 'desc'
		},
		take: pageInfo.pageLength,
		skip: pageInfo.pageNumber * pageInfo.pageLength,
	});
