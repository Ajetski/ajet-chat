import { Login, UserInfo } from '../resolvers-types';
import { createUser, getUserByUsername } from './users.service';

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

export const register = async (userData: UserInfo): Promise<Login> => {
	const user = await createUser(userData);
	return {
		user: user as any,
		token: user.id,
	};
};
