import { GraphQLUpload } from 'graphql-upload';

import { getUsers } from './services/users.service';
//import { login, register } from './services/auth.service';
import { Context } from './context';
import type { Resolvers } from '@graphql/types';
import { getMessages } from './services/message.service';
import { getChannels } from './services/channel.service';
import type { Message } from '@prisma/client';

const defaultPageInfo = {
	pageNumber: 0,
	pageLength: 15
}

export const resolvers: Resolvers<Context> = {
	Upload: GraphQLUpload,
	Query: {
		users: (_parent, { pageInfo }, _ctx) =>
			getUsers(pageInfo ?? defaultPageInfo),
		messages: (_parent, { channelId, pageInfo }, _ctx) =>
			getMessages(channelId, pageInfo ?? defaultPageInfo),
		channels: (_parent, { pageInfo }, _ctx) =>
			getChannels(pageInfo)
	},
	Mutation: {},
	Message: {
		author: (parent: Message, _params, ctx) =>
			ctx.loaders.getUsersByIds.load(parent.authorId)
	}
};
