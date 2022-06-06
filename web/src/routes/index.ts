import type { RequestHandler } from '@sveltejs/kit';
import type { Message } from '@graphql/types';
import { GET_MESSAGES } from '$lib/queries/message.query';
import { client } from '$lib/client';

export const get: RequestHandler = async () => {
	try {
		const messages = await client.query<{ messages: Message[] }>({
			query: GET_MESSAGES,
			variables: {
				channelId: 1,
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
