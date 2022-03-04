import { getPosts as posts } from './posts/posts.service';
import { getUsers as users } from './users/users.service';
import { userResolver as User } from './users/users.resolver';
import { postResolver as Post } from './posts/posts.resolver';
import { login } from './auth/auth.service';

export const resolvers = {
	User,
	Post,
	Query: {
		users,
		posts,
	},
	// Mutation: {
	// 	login,
	// 	register: () => ({
	// 		errors: [
	// 			{
	// 				field: 'username',
	// 				message: 'bad',
	// 			},
	// 			{
	// 				field: 'username2',
	// 				message: 'bad2',
	// 			},
	// 		],
	// 		user: {
	// 			id: 1,
	// 		},
	// 	}),
	// },
};
