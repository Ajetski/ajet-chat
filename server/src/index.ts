import { config } from 'dotenv';
config();
import { ApolloServer } from 'apollo-server-express';
import {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { graphqlUploadExpress } from 'graphql-upload';

import typeDefs from '../../shared/graphql/schema';
import { resolvers } from './resolvers';
import { context } from './context';
import cors from 'cors';
import router from './routes';
import { initSocketServer } from './socket-server';

// seed db
// import '../../shared/prisma/seed';

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
app.use(graphqlUploadExpress());
app.use(router);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context,
	plugins: [
		ApolloServerPluginDrainHttpServer({ httpServer }),
		ApolloServerPluginLandingPageGraphQLPlayground(),
	],
	introspection: true,
});
const io = initSocketServer(httpServer);
server.start().then(() => {
	server.applyMiddleware({ app });
	httpServer.listen({ port }, () => {
		console.log(`🚀 Server ready at http://localhost:${port}`);
	});
});
