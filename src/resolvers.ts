import { getPosts as posts } from './posts/posts.service';
import { getUsers as users } from './users/users.service';
import { userResolver as User } from './users/users.resolver';
import { postResolver as Post } from './posts/posts.resolver';
import { login, register } from './auth/auth.service';

export const resolvers = {
	User,
	Post,
	Query: {
		currentUser: (_parent, _params, ctx) => ctx.user,
		users,
		posts,
	},
	Mutation: {
		login: (_parent, { username, password }) => login(username, password),
		register: (_parent, { userInfo }) => register(userInfo),
	},
};
