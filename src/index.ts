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

// Configure HTTP Server
const app = express();
const port = process.env.PORT ?? 8080;
const httpServer = http.createServer(app);
app.use(
	cors({
		origin: [
			'https://studio.apollographql.com',
			'https://ajet-chat-dev.herokuapp.com',
		],
		allowedHeaders: ['authorization', 'content-type'],
		credentials: true,
	}),
);
app.use(express.static('public'));
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
server.start().then(() => {
	server.applyMiddleware({ app });
	httpServer.listen({ port }, () => {
		console.log(`🚀 Server ready at http://localhost:${port}`);
		console.log(
			`GraphQL endpoint is http://localhost:${port}${server.graphqlPath}`,
		);
	});
});

