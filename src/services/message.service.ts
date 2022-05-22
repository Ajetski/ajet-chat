import { MessageInfo } from '@graphql/types';
import { PrismaClient , Message} from '@prisma/client';

const prisma = new PrismaClient();

export const createMessage = (msgInfo: MessageInfo, authorId: number) =>
	prisma.message.create({
		data: {
			authorId,
			channelId: msgInfo.channelId,
			text: msgInfo.text,
		},
	});
