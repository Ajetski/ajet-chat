import { User } from './users.schema';

export const userResolver = {
	posts: (parent, _, ctx) => ctx.postsLoader.load(parent.id),
	lengthOfUsername: (parent: User) => parent?.username.length,
};
