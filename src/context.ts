import { postsLoader } from './services/posts.service';
import { posterLoader } from './services/users.service';
import { getUserByToken } from './services/users.service';
import type { User } from '@graphql/types';

export const context = async ({ req }) => {
	const token: string = req.headers.authorization;
	let user: User;
	if (token) {
		user = await getUserByToken(+token).catch(() => null);
	}

	return {
		postsLoader,
		posterLoader,
		user,
	};
};

export type Context = Awaited<ReturnType<typeof context>>;
