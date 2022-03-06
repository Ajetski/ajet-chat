import { User } from '@prisma/client';
import { createUser, getUserByUsername } from '../users/users.service';
import { Login } from './auth.schema';

export const login = async (
	username: string,
	password: string,
): Promise<Login> => {
	const user = await getUserByUsername(username).catch(() => null);
	if (user?.password === password) {
		return {
			user,
			token: user.id,
		};
	} else {
		throw new Error('incorrect username or password');
	}
};

export const register = async (userData: User): Promise<Login> => {
	const user = await createUser(userData);
	return {
		user,
		token: user.id,
	};
};
