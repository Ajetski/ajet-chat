import { getUserById } from '../users/users.service';

export const postResolver = {
	poster: (parent) => getUserById(parent.poster),
};
