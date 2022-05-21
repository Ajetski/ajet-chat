import { gql } from 'apollo-server-express';

export default gql`
	scalar Upload

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}

	type Query {
		users(pageInfo: PageInfo): [User!]!
	}

	type Mutation {
		register(userInfo: UserInfo!): Login!
		login(userInfo: UserInfo!): Login!
	}

	type User {
		id: Int!
		username: String!
	}

	input UserInfo {
		username: String!
		password: String!
	}

	type Login {
		user: User
		token: Int
	}

	input PageInfo {
		pageLength: Int!
		pageNumber: Int!
	}
`;
