import { gql } from 'apollo-server-express';
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
			register(userInfo: UserInfo!): User!
			login(username: String, password: String): User!
		}

		type Error {
			field: String!
			message: String!
		}
	`,
	userSchema,
	postsSchema,
];
