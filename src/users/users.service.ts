import sampleData from './users.data';
import { User } from './users.schema';

const users = new Map<number, User>();

let serial = 0;
sampleData.forEach((data) => {
	users.set(serial, {
		...data,
		id: serial,
		posts: [],
	});
	serial += 1;
});

export const getUsers = () => {
	let temp: User[] = [];
	for (let [_, value] of users) {
		temp.push(value);
	}
	return temp;
};

export const getUserById = (id: number): User => users.get(id)!;

export const getUserByUsername = (username: string): User => {
	for (let [_, value] of users) {
		if (value.username === username) {
			return value;
		}
	}
	return null;
};

export const createUser = (userInfo: User) => {
	if (getUserByUsername(userInfo.username)) {
		throw new Error('username already exists');
	}

	const user = {
		...userInfo,
		id: serial,
	};

	users.set(serial, user);
	serial += 1;

	console.log(user);

	return user;
};
