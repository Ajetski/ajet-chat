import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = () => {
	return {
		status: 303,
		headers: {
			Location: '/channels/1',
		},
	};
};
