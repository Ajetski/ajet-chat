import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const userData: { username: string; password: string; age: number }[] = [
	{
		username: 'ajet',
		password: 'password',
		age: 23,
	},
	{
		username: 'kleb',
		password: 'password',
		age: 24,
	},
	{
		username: 'boosh',
		password: 'password',
		age: 25,
	},
	{
		username: 'john',
		password: 'password',
		age: 21,
	},
	{
		username: 'ty',
		password: 'password',
		age: 24,
	},
];

async function main() {
	console.log('connected to db');

	if ((await prisma.user.count()) > 0) return;

	console.log(`Start seeding ...`);
	for (const u of userData) {
		const user = await prisma.user.create({
			data: u,
		});
		console.log(`Created user with id: ${user.id}`);
		const posts = await Promise.all(
			['first', 'second', 'third'].map((time) =>
				prisma.post.create({
					data: {
						text: `my ${time} post.`,
						poster_id: user.id,
					},
				}),
			),
		);
		console.log(
			`Created posts for user ${user.id} with ids: ${posts
				.map((p) => p.id)
				.join(',')}`,
		);
	}
	console.log(`Seeding finished`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
