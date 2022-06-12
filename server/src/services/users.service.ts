import { PrismaClient, User } from '../../../shared/prisma';
import type { PageInfo } from '../../../shared/graphql';

const prisma = new PrismaClient();

export const getUsers = (pageInfo: PageInfo): Promise<User[]> =>
	prisma.user.findMany({
		take: pageInfo.pageLength,
		skip: pageInfo.pageLength * pageInfo.pageNumber,
	});

export const getUserById = async (id: number): Promise<User> =>
	prisma.user.findFirst({
		where: {
			id,
		},
	});

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
		return users.find((user) => user.id === id);
	});
};
