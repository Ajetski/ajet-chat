import { gql } from 'apollo-server-express';
import { User } from '../users/users.schema';

export type Login = {
	user?: User;
	token?: number;
};

export const authSchema = gql`
	type Login {
		user: User
		token: ID # change type to use real access tokens later
	}
`;
