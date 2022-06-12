import { PrismaClient, Channel, User } from '@prisma/client';

const prisma = new PrismaClient();

const channels: Partial<Channel>[] = [{name: 'general' }];

const users: Partial<User>[] = [{ username: 'test user', hash: '' }];

(async () => {
	if ((await prisma.channel.count()) === 0) {
		console.log('channel table is empty, seeding...');
		for (let channel of channels) {
			await prisma.channel.create({ data: channel as Channel });
		}
	} else if ((await prisma.user.count()) === 0) {
		console.log('user table is empty, seeding...');
		for (let user of users) {
			await prisma.user.create({ data: user as User });
		}
	}
})();
