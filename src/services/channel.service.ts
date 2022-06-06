import { MessageInfo, PageInfo } from '@graphql/types';
import { PrismaClient, Message } from '@prisma/client';

const prisma = new PrismaClient();

/*export const createChannel = (msgInfo: MessageInfo) =>
	prisma.message.create({
		data: msgInfo,
	});*/

export const getChannels = (pageInfo: PageInfo) =>
	prisma.channel
		.findMany({
			take: pageInfo.pageLength,
			skip: pageInfo.pageNumber * pageInfo.pageLength,
		})
		.then((msgs) => msgs.reverse());
