import DataLoader from 'dataloader';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = (): Promise<User[]> => prisma.user.findMany();

export const getUserById = (id: number): Promise<User> =>
	prisma.user.findFirst({
		where: {
			id,
		},
	});

export const getUserByToken = getUserById;

export const getUserByUsername = (username: string): Promise<User> =>
	prisma.user.findUnique({
		where: {
			username,
		},
	});

export const createUser = async ({
	username,
	password,
	age,
}: User): Promise<User> =>
	prisma.user.create({
		data: {
			username,
			password,
			age,
		},
	});

export const posterLoader = new DataLoader(async (posterIds: number[]) => {
	let users = await prisma.user.findMany({
		where: {
			id: {
				in: posterIds,
			},
		},
	});

	let usersGroupedByPost = posterIds.map((posterId) => {
		return users.find((user) => user.id === posterId);
	});

	return usersGroupedByPost;
});
