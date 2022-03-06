import { User, Post } from '@prisma/client';
import { getPosts } from './services/posts.service';
import { getUsers } from './services/users.service';
import { login, register } from './services/auth.service';
import { Context } from './context';
import { Resolvers } from './resolvers-types';

export const resolvers: Resolvers<Context> = {
	Query: {
		currentUser: (_, __, ctx) => ctx.user,
		users: (_, __, ___) => getUsers(),
		posts: () => getPosts(),
	},
	Mutation: {
		login: (_, { username, password }) => login(username, password),
		register: (_, { userInfo }) => register(userInfo),
	},
	User: {
		posts: (parent, _, ctx) => ctx.postsLoader.load(parent.id),
		lengthOfUsername: (parent) => parent?.username.length,
	},
	Post: {
		poster: (parent, _, ctx) => ctx.posterLoader.load(parent.poster.id),
	},
};
