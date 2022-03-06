import { User, Post } from '@prisma/client';
import { getPosts } from './services/posts.service';
import { getUsers } from './services/users.service';
import { login, register } from './services/auth.service';

export const resolvers = {
	Query: {
		currentUser: (_parent, _params, ctx) => ctx.user,
		users: () => getUsers(),
		posts: () => getPosts(),
	},
	Mutation: {
		login: (_parent, { username, password }) => login(username, password),
		register: (_parent, { userInfo }) => register(userInfo),
	},
	User: {
		posts: (parent: User, _, ctx) => ctx.postsLoader.load(parent.id),
		lengthOfUsername: (parent: User) => parent?.username.length,
	},
	Post: {
		poster: (parent: Post, _params, ctx) =>
			ctx.posterLoader.load(parent.poster_id),
	},
};
