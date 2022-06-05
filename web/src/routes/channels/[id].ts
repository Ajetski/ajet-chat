import type { RequestHandler } from '@sveltejs/kit';
import { ApolloClient } from '@apollo/client/core';
import { HttpLink } from '@apollo/client/link/http';
import { InMemoryCache } from '@apollo/client/cache';
import type { Message } from '@graphql/types';
import { GET_MESSAGES } from '$lib/queries/message.query';

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: `http://localhost:${process.env.PORT ?? 8080}/graphql`
	}),
	defaultOptions: {
		query: {
			fetchPolicy: 'no-cache'
		}
	}
});

export const get: RequestHandler = async ({ params }) => {
	try {
		const messages = await client.query<{ messages: Message[] }>({
			query: GET_MESSAGES,
			variables: {
				channelId: +params.id,
				pageInfo: {
					pageNumber: 0,
					pageLength: 30
				}
			}
		});

		if (messages) {
			return {
				body: { messages: messages.data.messages }
			};
		}
	} catch (err: any) {
		console.log(JSON.stringify(err));
		return {
			status: 500
		}
	}

	return {
		status: 404
	};
};
