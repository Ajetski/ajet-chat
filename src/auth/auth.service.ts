import { User } from '../users/users.schema';
import { createUser, getUserByUsername } from '../users/users.service';

export const login = (_parent, { username, password }): User => {
	const user = getUserByUsername(username);
	if (user?.password === password) {
		return user;
	} else {
		throw new Error('incorrect username or password');
	}
};

export const register = (_, user) => createUser(user);
