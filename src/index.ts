import { ApolloServer } from 'apollo-server-express';
import {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';

import typeDefs from './schema';
import { resolvers } from './resolvers';
import { context } from './context';
import cors from 'cors';

import '../prisma/seed';

const app = express();
const port = process.env.PORT ?? 4000;
const httpServer = http.createServer(app);
app.use(
	cors({
		origin: 'https://studio.apollographql.com',
		allowedHeaders: ['authorization', 'content-type'],
	}),
);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context,
	plugins: [
		ApolloServerPluginDrainHttpServer({ httpServer }),
		ApolloServerPluginLandingPageGraphQLPlayground(),
	],
	introspection: true, // disable for production application
});

app.get('/', (_req, res) => res.redirect('/graphql'));

server.start().then(() => {
	server.applyMiddleware({ app });
	httpServer.listen({ port }, () => {
		console.log(
			`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
		);
	});
});
