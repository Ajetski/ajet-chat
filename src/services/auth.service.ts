import type { User } from '@prisma/client';
import type { DeepPartial } from 'utility-types';
import type { Login, UserInfo } from '@graphql/types';
/*import { createUser, getUserByUsername } from './users.service';

export const login = async (
	username: string,
	password: string,
): Promise<DeepPartial<Login>> => {
	const user: User = await getUserByUsername(username).catch(() => null);
	if (user?.password === password) {
		return {
			user,
			token: user.id,
		};
	} else {
		throw new Error('incorrect username or password');
	}
};

export const register = async (
	userData: UserInfo,
): Promise<DeepPartial<Login>> => {
	const user = await createUser(userData);
	return {
		user: user,
		token: user.id,
	};
};*/
