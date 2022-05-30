import { gql } from '@apollo/client/core';

export const POSTS = gql`
	query Query($pageInfo: PageInfo) {
		posts(pageInfo: $pageInfo) {
			text
			poster {
				username
			}
			mediaUrl
		}
	}
`;

export const CREATE_POST = gql`
	mutation Mutation($post: CreatePostInfo!) {
		createPost(post: $post) {
			id
		}
	}
`;
