import DataLoader from 'dataloader';
import { PrismaClient, Post } from '@prisma/client';
import type { PageInfo, CreatePostInfo } from '@graphql/types';
import { uploadFile } from './file.service';

const prisma = new PrismaClient();

export const getPosts = (pageInfo: PageInfo): Promise<Post[]> =>
	prisma.post.findMany({
		take: pageInfo.pageLength,
		skip: pageInfo.pageLength * pageInfo.pageNumber,
	});

export const getPostsById = (id: number) =>
	prisma.post.findUnique({
		where: { id },
	});

export const createPost = async (
	post: CreatePostInfo,
	userId: number,
): Promise<Post> =>
	prisma.post.create({
		data: {
			text: post.text,
			media: await uploadFile(post.media),
			poster_id: userId,
		},
	});

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
