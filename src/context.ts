import { postsLoader } from './posts/posts.service';
import { getUserByToken } from './users/users.service';

export const context = async ({ req }) => {
	const token = req.headers.authorization;
	let user;
	if (token) {
		user = await getUserByToken(token);
	}

	return {
		postsLoader,
		user,
	};
};
