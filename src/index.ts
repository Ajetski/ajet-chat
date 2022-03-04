import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

import { typeDefs } from './schemas';
import { resolvers } from './resolvers';
import { context } from './context';

const app = express();
const port = process.env.PORT ?? 4000;
const httpServer = http.createServer(app);
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	introspection: true, // disable for production application
});

server.start().then(() => {
	server.applyMiddleware({ app });
	httpServer.listen({ port }, () => {
		console.log(
			`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
		);
	});
});
