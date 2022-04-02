import DataLoader from 'dataloader';
import { PrismaClient, User } from '@prisma/client';
import type { PageInfo, UserInfo } from '@graphql/types';

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

export const posterLoader = new DataLoader(
	async (posterIds: number[]): Promise<User[]> => {
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
	},
);
