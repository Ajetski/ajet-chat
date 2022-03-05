import { User } from '../users/users.schema';
import { createUser, getUserByUsername } from '../users/users.service';

export const login = async (
	username: string,
	password: string,
): Promise<User> => {
	const user = await getUserByUsername(username);
	if (user?.password === password) {
		return user;
	} else {
		throw new Error('incorrect username or password');
	}
};

export const register = (user: User): Promise<User> => createUser(user);
