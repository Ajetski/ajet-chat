import { gql } from 'apollo-server-express';

export const userSchema = gql`
	type User {
		id: ID!
		username: String!
		posts: [Post!]!
		lengthOfUsername: Int!
		age: Int
	}

	input UserInfo {
		username: String!
		password: String!
		age: Int
	}
`;
