import { postsLoader } from './services/posts.service';
import { posterLoader } from './services/users.service';
import { getUserByToken } from './services/users.service';
import type { User } from '@graphql/types';

export const context = async ({ req }) => {
	let user: User;
	if (req.headers.authorization?.startsWith('Bearer ')) {
		const token = req.headers.authorization.substring(7);
		console.log(token);
		user = await getUserByToken(+token).catch(() => null);
	}

	return {
		postsLoader,
		posterLoader,
		user,
	};
};

export type Context = Awaited<ReturnType<typeof context>>;
