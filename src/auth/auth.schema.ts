import { User } from '@prisma/client';
import { gql } from 'apollo-server-express';

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
