import { GraphQLUpload } from 'graphql-upload';

import { createPost, getPosts } from './services/posts.service';
import { getUsers } from './services/users.service';
import { login, register } from './services/auth.service';
import { Context } from './context';
import type { Resolvers } from '@graphql/types';
import { Post } from '@prisma/client';

export const resolvers: Resolvers<Context> = {
	Upload: GraphQLUpload,
	Query: {
		currentUser: (parent, params, ctx) => ctx.user,
		users: (parent, { pageInfo }) =>
			getUsers({ pageNumber: 0, pageLength: 15, ...pageInfo }),
		posts: async (parent, { pageInfo }) =>
			getPosts({ pageNumber: 0, pageLength: 15, ...pageInfo }),
	},
	Mutation: {
		login: (parent, { username, password }) => login(username, password),
		register: (parent, { userInfo }) => register(userInfo),
		createPost: (parent, { post }, ctx) => createPost(post, ctx.user.id),
	},
	User: {
		posts: (parent, _, ctx) => ctx.postsLoader.load(parent.id),
		lengthOfUsername: (parent) => parent?.username.length,
	},
	Post: {
		poster: (parent: Post, _, ctx) => ctx.posterLoader.load(parent.poster_id),
		mediaUrl: (parent: Post) =>
			parent.media != null ? `/posts/media/${parent.id}` : null,
	},
};
