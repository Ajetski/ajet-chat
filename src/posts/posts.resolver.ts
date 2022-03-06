import { Post } from '@prisma/client';

export const postResolver = {
	poster: (parent: Post, _params, ctx) =>
		ctx.posterLoader.load(parent.poster_id),
};
