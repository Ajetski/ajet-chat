import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/*export const createChannel = (msgInfo: MessageInfo) =>
	prisma.message.create({
		data: msgInfo,
	});*/

export const getDirectMessages = (dmChannelId: number) =>
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
				},
			},
			where: {
				id: dmChannelId,
			},
		})
		.then((data) => data?.directMessages.map((dm) => dm.message));
