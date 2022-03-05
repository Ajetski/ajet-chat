import DataLoader from 'dataloader';
import { db } from '../db';

type Post = {
	id: number;
	text: string;
	poster: number;
};

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
