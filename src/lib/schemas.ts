import { z } from 'zod';

export const PageInfo = z.object({
	pageLength: z.number(),
	pageNumber: z.number(),
});
