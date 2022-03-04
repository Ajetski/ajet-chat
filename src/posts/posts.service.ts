import DataLoader from 'dataloader';
import sampleData from './posts.data';

type Post = {
	id: number;
	text: string;
	poster: number;
};

const posts = new Map<number, Post>();

let serial = 0;
sampleData.forEach((data) => {
	posts.set(serial, {
		...data,
		id: serial,
	});
	serial += 1;
});

export const getPosts = () => {
	let temp = [];
	for (let [_, value] of posts) {
		temp.push(value);
	}
	return temp;
};

export const postsLoader = new DataLoader(async (userIds) => {
	let userPosts = [];
	for (let [_, post] of posts) {
		if (post.poster in userIds) userPosts.push(post);
	}

	let postsGroupedByUser = userIds.map((userId) => {
		return userPosts.filter((post) => post.poster === userId);
	});

	return postsGroupedByUser;
});
