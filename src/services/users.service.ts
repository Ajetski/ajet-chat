import DataLoader from 'dataloader';
import Prisma from '@prisma/client';
import type { PageInfo, UserInfo } from '../resolvers-types';

const prisma = new Prisma.PrismaClient();

export const getUsers = (pageInfo: PageInfo): Promise<Prisma.User[]> =>
	prisma.user.findMany({
		take: pageInfo.pageLength,
		skip: pageInfo.pageLength * pageInfo.pageNumber,
	});

export const getUserById = (id: number): Promise<Prisma.User> =>
	prisma.user.findFirst({
		where: {
			id,
		},
	});

export const getUserByToken = getUserById;

export const getUserByUsername = (username: string): Promise<Prisma.User> =>
	prisma.user.findUnique({
		where: {
			username,
		},
	});

export const createUser = async (user: UserInfo): Promise<Prisma.User> =>
	prisma.user.create({
		data: user,
	});

export const posterLoader = new DataLoader(
	async (posterIds: number[]): Promise<Prisma.User[]> => {
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
