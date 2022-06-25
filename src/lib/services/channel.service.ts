import { PrismaClient } from '../../../shared/prisma';

import { PageInfo } from '../../../shared/graphql';

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
