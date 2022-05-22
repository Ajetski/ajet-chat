import { PrismaClient, Channel, User } from '@prisma/client';

const prisma = new PrismaClient();

const channels: Channel[] = [{ id: undefined, name: 'general' }];

const users: User[] = [{ id: undefined, username: 'test user', hash: '' }];

(async () => {
	if ((await prisma.channel.count()) === 0) {
		console.log('channel table is empty, seeding...');
		for (let channel of channels) {
			await prisma.channel.create({ data: channel });
		}
	} else if ((await prisma.user.count()) === 0) {
		console.log('user table is empty, seeding...');
		for (let user of users) {
			await prisma.user.create({ data: user });
		}
	}
})();
