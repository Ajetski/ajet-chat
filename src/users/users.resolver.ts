import { User } from '@prisma/client';

export const userResolver = {
	posts: (parent: User, _, ctx) => ctx.postsLoader.load(parent.id),
	lengthOfUsername: (parent: User) => parent?.username.length,
};
