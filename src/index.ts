import { config } from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';

config();

import { initSocketServer } from './socket-server';

// Configure HTTP Server
const app = express();
const port = process.env.PORT ?? 8080;
const httpServer = http.createServer(app);
app.use(
	cors({
		origin: [
			'https://studio.apollographql.com',
			'https://ajet-chat-dev.herokuapp.com',
			'http://localhost:8080',
			'http://localhost:3000',
		],
		credentials: true,
	}),
);
const io = initSocketServer(httpServer);
httpServer.listen({ port }, () => {
	console.log(`🚀 Server ready at http://localhost:${port}`);
});
