import { postsLoader } from './posts/posts.service';

export const context = async ({}) => {
	return {
		postsLoader: postsLoader,
	};
};
