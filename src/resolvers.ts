import { getPosts as posts } from './posts/posts.service';
import { getUserByToken, getUsers as users } from './users/users.service';
import { userResolver as User } from './users/users.resolver';
import { postResolver as Post } from './posts/posts.resolver';
import { login, register } from './auth/auth.service';

export const resolvers = {
	User,
	Post,
	Query: {
		user: (_parent, _params, ctx) => ctx.user,
		users,
		posts,
	},
	Mutation: {
		login: async (_parent, { username, password }) => {
			const user = await login(username, password);
			return user;
		},
		register: async (_parent, { userInfo }) => {
			const user = await register(userInfo);
			return user;
		},
	},
};
