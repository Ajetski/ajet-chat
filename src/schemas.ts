import { gql } from 'apollo-server-express';
import { authSchema } from './auth/auth.schema';
import { postsSchema } from './posts/posts.schema';
import { userSchema } from './users/users.schema';

export const typeDefs = [
	gql`
		type Query {
			user: User
			users: [User!]!
			posts: [Post!]!
		}

		type Mutation {
			register(userInfo: UserInfo!): Login!
			login(username: String, password: String): Login!
		}
	`,
	userSchema,
	postsSchema,
	authSchema,
];
