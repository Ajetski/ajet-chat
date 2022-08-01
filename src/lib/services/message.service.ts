import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createMessage = async (msgInfo: Prisma.MessageCreateInput) => {
	console.log('msgInfo to create', msgInfo);
	const msg = await prisma.message.create({
		data: msgInfo,
		include: {
			author: {
				select: {
					id: true,
					username: true,
				},
			},
			directMessage: {
				include: {
					channel: true,
				},
			},
			channelMessage: {
				include: {
					channel: true,
				},
			},
		},
	});
	console.log('msg created response', msg);
	return msg;
};

export const getMessages = (channelId: number, pageInfo: any) =>
	prisma.messageChannelMapping
		.findMany({
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
		})
		.then((res) => res.map((msg) => msg.message));
export type Messages = Awaited<ReturnType<typeof getMessages>>;
