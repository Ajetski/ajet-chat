import { getMessages } from '$lib/services/message.service';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	return {
		body: {
			messages: await getMessages(+params.id, {
				pageLength: 30,
				pageNumber: 0,
			}),
			//channelId: +params.id,
		},
	};
};
