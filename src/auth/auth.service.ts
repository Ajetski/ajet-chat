import { User } from '../users/users.schema';
import { createUser, getUserByUsername } from '../users/users.service';

export const login = (username: string, password: string): User => {
	const user = getUserByUsername(username);
	if (user?.password === password) {
		return user;
	} else {
		throw new Error('incorrect username or password');
	}
};

export const register = (user: User): User => {
	const val = createUser(user);
	console.log('debug: ', val);
	return val;
};
