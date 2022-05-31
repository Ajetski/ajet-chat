import { ApolloServer } from 'apollo-server-express';
import {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { graphqlUploadExpress } from 'graphql-upload';

import typeDefs from './schema';
import { resolvers } from './resolvers';
import { context } from './context';
import cors from 'cors';
import router from './routes';
import { initSocketServer } from './socket-server';

// seed db
import '../prisma/seed';

// Configure HTTP Server
const app = express();
const port = process.env.PORT ?? 8080;
const httpServer = http.createServer(app);
app.use(
	cors({
		origin: [
			'https://studio.apollographql.com',
			'https://ajet-chat-dev.herokuapp.com',
			'http://localhost:8080'
		],
		credentials: true,
	}),
);
app.use(graphqlUploadExpress());
app.use(router);

// Configure sveltekit access
if (process.env.NODE_ENV !== 'local') {
	import('../web/dist/handler.js').then(({handler}) => {
		app.use(handler);
	})
}

app.use(express.static('web/dist/static'));
app.use(express.static('web/dist/client'));

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
