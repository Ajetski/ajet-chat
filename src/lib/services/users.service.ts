import type { InferQueryInput } from '$lib/trpc/client';
import { PrismaClient, User } from '@prisma/client';

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

export const createUser = async (user: UserInfo): Promise<User> =>
	prisma.user.create({
		data: user,
	});

*/
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
