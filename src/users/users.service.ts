import DataLoader from 'dataloader';
import { db } from '../db';
import { User } from './users.schema';

export const getUsers = (): Promise<User[]> =>
	db.all(`
		SELECT *
		FROM USERS;
	`);

export const getUserById = (id: number): Promise<User> =>
	db.get(
		`
		SELECT *
		FROM USERS
		WHERE id = ?;
	`,
		id,
	);

export const getUserByToken = getUserById;

export const getUserByUsername = (username: string): Promise<User> =>
	db.get(
		`
		SELECT *
		FROM USERS
		WHERE username = ?;
	`,
		username,
	);

export const createUser = async (userInfo: User): Promise<User> => {
	await db.run(
		`
		INSERT INTO USERS(username, password, age)
		VALUES (?, ?, ?);
	`,
		[userInfo.username, userInfo.password, userInfo.age],
	);

	return getUserByUsername(userInfo.username);
};

export const posterLoader = new DataLoader(async (posterIds) => {
	let users: User[] = await db.all(
		`
		SELECT * FROM USERS WHERE ID in (${posterIds.map((_) => '?').join(',')})
	`,
		posterIds,
	);

	let usersGroupedByPost = posterIds.map((posterId) => {
		return users.find((user) => user.id === posterId);
	});

	return usersGroupedByPost;
});
