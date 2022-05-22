import { gql } from 'apollo-server-express';

export default gql`
	scalar Upload

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}

	type Query {
		users(pageInfo: PageInfo!): [User!]!
		messages(channelId: Int!, pageInfo: PageInfo!): [Message!]!
	}

	type Mutation {
		register(userInfo: UserInfo!): Login!
		login(userInfo: UserInfo!): Login!
		postMessage(msgInfo: MessageInfo!): Message!
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
		user: User!
		token: Int!
	}

	type Channel {
		id: Int!
		name: String!
		messages: [Message!]
	}

	type Message {
		id: Int!
		text: String!
		author: User
		channel: Channel
		fileUrls: [String!]!
	}

	input MessageInfo {
		text: String!
		channelId: Int!
		authorId: Int!
	}

	input PageInfo {
		pageLength: Int!
		pageNumber: Int!
	}
`;
