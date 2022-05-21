import { GraphQLUpload } from 'graphql-upload';

import { getUsers } from './services/users.service';
//import { login, register } from './services/auth.service';
import { Context } from './context';
import type { Resolvers } from '@graphql/types';

export const resolvers: Resolvers<Context> = {
	Upload: GraphQLUpload,
	Query: {
		users: (parent, { pageInfo }, ctx) =>
			getUsers(pageInfo ?? { pageNumber: 0, pageLength: 15 }),
	},
	Mutation: {},
};
