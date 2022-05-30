import { gql } from '@apollo/client/core';

export const USERS = gql`
	query CurrentUser {
		users {
			id
			username
			lengthOfUsername
			age
		}
	}
`;

export const CURRENT_USER = gql`
	query CurrentUser {
		currentUser {
			id
			username
			lengthOfUsername
			age
		}
	}
`;

export const LOGIN = gql`
	mutation Mutation($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			user {
				id
				username
				age
				lengthOfUsername
			}
			token
		}
	}
`;

export const REGISTER = gql`
	mutation Mutation($userInfo: UserInfo!) {
		register(userInfo: $userInfo) {
			user {
				id
				username
				lengthOfUsername
				age
			}
			token
		}
	}
`;
