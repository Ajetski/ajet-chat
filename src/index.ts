import { ApolloServer } from 'apollo-server-express';
import {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import https from 'https';
import { graphqlUploadExpress } from 'graphql-upload';

import typeDefs from './schema';
import { resolvers } from './resolvers';
import { context } from './context';
import cors from 'cors';
import router from './routes';

// Seed the db if it is empty
import '../prisma/seed';
import { readFileSync } from 'fs';
import { join } from 'path';

const credentials = {
	key: readFileSync(join('certs', 'privatekey.pem')),
	cert: readFileSync(join('certs', 'certificate.pem')),
};

// Configure HTTP Server
const app = express();
const port = process.env.PORT ?? 8080;
const securePort = process.env.SECURE_PORT ?? 8443;
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
app.use(
	cors({
		origin: [
			'https://studio.apollographql.com',
			'https://ajet-graphql-project.herokuapp.com',
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
	httpsServer.listen({ port: securePort }, () => {
		console.log(`🚀 Server ready at https://localhost:${securePort}`);
		console.log(
			`GraphQL endpoint is https://localhost:${securePort}${server.graphqlPath}`,
		);
	});
});

