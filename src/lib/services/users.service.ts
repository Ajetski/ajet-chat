import { Prisma, PrismaClient } from '@prisma/client';
import type { User } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = (pageInfo: any): Promise<User[]> =>
	prisma.user.findMany({
		take: pageInfo.pageLength,
		skip: pageInfo.pageLength * pageInfo.pageNumber,
	});

export const getUserById = async (id: number): Promise<User> => {
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	});

	if (!user) throw 'user not found';

	return user;
};

/*
export const getUserByToken = getUserById;

export const getUserByUsername = (username: string): Promise<User> =>
	prisma.user.findUnique({
		where: {
			username,
		},
	});
*/
export const createUser = async (user: Prisma.UserCreateInput) =>
	prisma.user.create({
		data: user,
		select: {
			id: true,
			username: true,
			voiceChannel: {
				include: {
					chatters: {
						select: {
							username: true,
							id: true,
							voiceChannel: true,
							voiceChannelId: true,
						},
					},
				},
			},
			voiceChannelId: true,
		},
	});

export const getUsersByIds = async (ids: number[]): Promise<User[]> => {
	let users = await prisma.user.findMany({
		where: {
			id: {
				in: ids,
			},
		},
	});

	//TODO: improve this; can be faster than O(n^2)
	return ids.map((id) => {
		return users.find((user) => user.id === id)!;
	});
};

export const getUserByUsername = async (username: string) => {
	return prisma.user.findFirst({
		where: {
			username,
		},
		include: {
			voiceChannel: {
				include: {
					chatters: {
						select: {
							username: true,
							id: true,
							voiceChannel: true,
							voiceChannelId: true,
						},
					},
				},
			},
		},
	});
};

export const joinVoice = async (userId: number, channelId: number) => {
	return await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			voiceChannelId: channelId,
		},
		include: {
			voiceChannel: {
				include: {
					chatters: true,
				},
			},
		},
	});
};

export const leaveVoice = async (userId: number) => {
	return await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			voiceChannelId: null,
		},
		include: {
			voiceChannel: {
				include: {
					chatters: true,
				},
			},
		},
	});
};

export type UserRes = Awaited<ReturnType<typeof createUser>>;
