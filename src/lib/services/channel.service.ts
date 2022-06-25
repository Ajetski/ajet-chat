import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/*export const createChannel = (msgInfo: MessageInfo) =>
	prisma.message.create({
		data: msgInfo,
	});*/

export const getChannels = (pageInfo: any) =>
	prisma.channel
		.findMany({
			take: pageInfo.pageLength,
			skip: pageInfo.pageNumber * pageInfo.pageLength,
		})
		.then((msgs: any) => msgs.reverse());
