import { gql } from 'apollo-server-express';

export const postsSchema = gql`
	type Post {
		id: ID!
		text: String!
		poster: User!
	}
`;
