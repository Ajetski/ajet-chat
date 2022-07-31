import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/*export const createChannel = (msgInfo: MessageInfo) =>
	prisma.message.create({
		data: msgInfo,
	});*/

export const getDirectMessages = (
	dmChannelId: number,
	pageInfo: {
		pageNumber: number;
		pageLength: number;
	},
) =>
	prisma.directMessageChannel
		.findFirst({
			include: {
				directMessages: {
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
					orderBy: {
						message: {
							createdTs: 'desc',
						},
					},
					take: pageInfo.pageLength,
					skip: pageInfo.pageLength * (pageInfo.pageNumber - 1),
				},
			},
			where: {
				id: dmChannelId,
			},
		})
		.then((data) => data?.directMessages.map((dm) => dm.message));
