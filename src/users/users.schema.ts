import { gql } from 'apollo-server-express';

export type User = {
	id: number;
	username: string;
	password: string;
	age?: number;
	posts: number[];
};

export const userSchema = gql`
	type User {
		id: ID!
		username: String!
		posts: [Post!]!
		lengthOfUsername: Int!
	}

	type RegisterResponse {
		errors: [Error!]!
		user: User
	}

	input UserInfo {
		username: String!
		password: String!
		age: Int
	}
`;
