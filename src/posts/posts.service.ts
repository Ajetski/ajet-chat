import DataLoader from 'dataloader';
import { db } from '../db';
import { Post } from './posts.schema';

export const getPosts = (): Promise<Post[]> => {
	return db.all(`
		SELECT * FROM POSTS;
	`);
};

export const postsLoader = new DataLoader(async (userIds) => {
	let posts: Post[] = await db.all(
		`
		SELECT * FROM POSTS WHERE poster in (${userIds.map((_) => '?').join(',')})
	`,
		userIds,
	);

	let postsGroupedByUser = userIds.map((userId) => {
		return posts.filter((post) => post.poster === userId);
	});

	return postsGroupedByUser;
});
