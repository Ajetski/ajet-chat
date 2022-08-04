import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/*export const createChannel = (msgInfo: MessageInfo) =>
	prisma.message.create({
		data: msgInfo,
	});*/

export const getChannels = (pageInfo: any) =>
	prisma.channel.findMany({
		take: pageInfo.pageLength,
		skip: pageInfo.pageNumber * pageInfo.pageLength,
		include: {
			chatters: {
				select: {
					id: true,
					username: true,
					voiceChannel: true,
					voiceChannelId: true,
				},
			},
		},
	});

export const getChannelById = async (channelId: number) =>
	prisma.channel.findUnique({
		where: {
			id: channelId,
		},
		include: {
			chatters: {
				select: {
					id: true,
					username: true,
					voiceChannel: true,
					voiceChannelId: true,
				},
			},
		},
	});
