import { ApolloClient } from '@apollo/client/core';
import { HttpLink } from '@apollo/client/link/http';
import { InMemoryCache } from '@apollo/client/cache';

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: `http://localhost:${process.env.PORT ?? 8080}/graphql`
	}),
	defaultOptions: {
		query: {
			fetchPolicy: 'no-cache'
		}
	}
});


