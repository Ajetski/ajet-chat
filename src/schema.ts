import { gql } from 'apollo-server-express';

export default gql`
	scalar Upload

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}

	type Query {
		currentUser: User
		users(pageInfo: PageInfo): [User!]!
		posts(pageInfo: PageInfo): [Post!]!
	}

	type Mutation {
		register(userInfo: UserInfo!): Login!
		login(username: String!, password: String!): Login!
		createPost(post: CreatePostInfo!): Post!
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
		hasMedia: Boolean!
	}

	input CreatePostInfo {
		text: String!
		media: Upload
	}

	type Login {
		user: User
		token: Int # change type to use real access tokens later
	}

	input PageInfo {
		pageLength: Int!
		pageNumber: Int!
	}
`;
