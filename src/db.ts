const { PromisedDatabase } = require('promised-sqlite3'); // import the class

export const db = new PromisedDatabase(); // create a instance of PromisedDatabase

(async () => {
	await db.open('./db.sqlite');

	// make tables
	await db.run(`
		CREATE TABLE IF NOT EXISTS USERS (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			username TEXT UNIQUE NOT NULL,
			password TEXT NOT NULL,
			age INTEGER
		);
	`);

	await db.run(`
		CREATE TABLE IF NOT EXISTS POSTS (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			text TEXT NOT NULL,
			poster INTEGER REFERENCES USERS(id)
		);
	`);

	// insert dummy data if needed
	try {
		await db.run(`
			INSERT INTO USERS(id, username, password, age) VALUES
			(1, 'ajet', 'password', 23),
			(2, 'ty', 'password', 24),
			(3, 'boosh', 'password', 24),
			(4, 'john', 'password', 21),
			(5, 'pianooo', 'password', 21),
			(6, 'kleb', 'password', 24);
		`);
	} catch (_) {}

	try {
		await db.run(`
			INSERT INTO POSTS(id, text, poster) VALUES
			(1, 'first post ever', 1),
			(2, 'this is a cool api', 1),
			(3, 'resolvers are fun', 2),
			(4, 'beep boop bop. i am a robot', 2);
		`);
	} catch (_) {}

	// print db data
	console.log('user data: ', await db.all('SELECT * FROM USERS;'));
	console.log('post data: ', await db.all('SELECT * FROM POSTS;'));
})();
