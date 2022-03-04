import { getPosts as posts } from './posts/posts.service';
import { getUsers as users } from './users/users.service';
import { userResolver as User } from './users/users.resolver';
import { postResolver as Post } from './posts/posts.resolver';
import { login, register } from './auth/auth.service';

export const resolvers = {
	User,
	Post,
	Query: {
		users,
		posts,
	},
	Mutation: {
		login: (_, { username, password }) => login(username, password),
		register: (_, { userInfo }) => register(userInfo),
	},
};
