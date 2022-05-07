<script lang="ts">
	import {
		ApolloClient,
		createHttpLink,
		InMemoryCache,
	} from '@apollo/client/core';
	import { setContext } from '@apollo/client/link/context';
	import { setClient } from 'svelte-apollo';
	import Home from './components/Home.svelte';
	import { clientStore } from './stores/graphql-client.store';
	import { tokenStore, userStore } from './stores/user.store';

	const httpLink = createHttpLink({
		uri: '/graphql',
	});

	const authLink = setContext((_, { headers }) => {
		const token = $tokenStore;
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : '',
			},
		};
	});

	const client = new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	});
	setClient(client);
	// clientStore.set(client);
</script>

<main>
	<Home />
</main>
