import DataLoader from 'dataloader';
import { PrismaClient, Post } from '@prisma/client';

const prisma = new PrismaClient();

export const getPosts = (): Promise<Post[]> => prisma.post.findMany();

export const postsLoader = new DataLoader(
	async (userIds: number[]): Promise<Post[][]> => {
		let posts = await prisma.post.findMany({
			where: {
				poster_id: {
					in: userIds,
				},
			},
		});

		let postsGroupedByUser = userIds.map((userId) => {
			return posts.filter((post) => post.poster_id === userId);
		});

		return postsGroupedByUser;
	},
);
