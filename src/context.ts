import { postsLoader } from './posts/posts.service';
import { posterLoader } from './users/users.service';
import { getUserByToken } from './users/users.service';

export const context = async ({ req }) => {
	const token: string = req.headers.authorization;
	let user;
	if (token) {
		user = await getUserByToken(+token).catch(() => null);
	}

	return {
		postsLoader,
		posterLoader,
		user,
	};
};
