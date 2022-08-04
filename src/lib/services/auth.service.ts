import { PrismaClient } from '@prisma/client';
import type { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { z } from 'zod';
import { createUser, getUserByUsername, UserRes } from './users.service';

const prisma = new PrismaClient();

const generateHash = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(8);
	return bcrypt.hash(password, salt);
};

const isPasswordValid = async (
	hash: string,
	password: string,
): Promise<boolean> => {
	return bcrypt.compare(password, hash);
};

export const userDataSchema = z.object({
	username: z.string(),
	password: z.string(),
});
export type UserData = z.infer<typeof userDataSchema>;

export const register = async (userData: UserData) =>
	createUser({
		username: userData.username,
		hash: await generateHash(userData.password),
	});

export const login = async (userData: UserData) => {
	const user = await getUserByUsername(userData.username);
	if (user && (await isPasswordValid(user.hash, userData.password))) {
		return {
			id: user.id,
			username: user.username,
			voiceChannel: user.voiceChannel,
			voiceChannelId: user.voiceChannelId
		};
	}
	return undefined;
};
