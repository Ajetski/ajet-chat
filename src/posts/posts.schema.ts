import { gql } from 'apollo-server-express';

export type Post = {
	id: number;
	text: string;
	poster: number;
};

export const postsSchema = gql`
	type Post {
		id: ID!
		text: String!
		poster: User!
	}
`;
