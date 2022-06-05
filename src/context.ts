import type { User } from '@graphql/types';
import DataLoader from 'dataloader';
import {getUsersByIds} from './services/users.service';

const loaders = () => ({
	getUsersByIds: new DataLoader(getUsersByIds)
});

export const context = async ({ req }) => {
	//let user: User;
	//if (req.headers.authorization?.startsWith('Bearer ')) {
		//const token = req.headers.authorization.substring(7);
		//user = await getUserByToken(+token).catch(() => null);
	//}

	return {
		loaders: loaders()
		//user,
	};
};

export type Context = Awaited<ReturnType<typeof context>>;
