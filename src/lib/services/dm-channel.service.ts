import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/*export const createChannel = (msgInfo: MessageInfo) =>
	prisma.message.create({
		data: msgInfo,
	});*/

export const getDmChannels = (userId: number) =>
	prisma.directMessageChannel
		.findMany({
			include: {
				user1: {
					select: {
						id: true,
						username: true,
					},
				},
				user2: {
					select: {
						id: true,
						username: true,
					},
				},
			},
			where: {
				OR: [
					{
						user1Id: userId,
					},
					{
						user2Id: userId,
					},
				],
			},
		})
		.then((data) =>
			data.map((dmChannel) => ({
				id: dmChannel.id,
				otherUser:
					dmChannel.user1.id === userId ? dmChannel.user2 : dmChannel.user1,
			})),
		);
