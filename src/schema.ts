import { gql } from 'apollo-server-express';

export default gql`
	type Query {
		currentUser: User
		users: [User!]!
		posts: [Post!]!
	}

	type Mutation {
		register(userInfo: UserInfo!): Login!
		login(username: String, password: String): Login!
	}

	type User {
		id: Int!
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

	type Post {
		id: Int!
		text: String!
		poster: User!
	}

	type Login {
		user: User
		token: Int # change type to use real access tokens later
	}
`;
