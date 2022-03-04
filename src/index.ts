import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

import { typeDefs } from './schemas';
import { resolvers } from './resolvers';
import { context } from './context';

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

server.start().then(() => {
	server.applyMiddleware({ app });
	httpServer.listen({ port: 4000 }, () => {
		console.log(
			`🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
		);
	});
});
