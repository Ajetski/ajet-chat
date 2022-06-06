<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { client } from '$lib/client';
	import { GET_CHANNELS } from '$lib/queries/channel.query';
	import type { Channel } from '@graphql/types';

	export const load: Load = async () => {
		const req = await client
			.query<{ channels: Channel[] }>({
				query: GET_CHANNELS,
				variables: {
					pageInfo: {
						pageNumber: 0,
						pageLength: 30
					}
				}
			})
			.catch((err) => {
				throw JSON.stringify(err);
			});
		return {
			props: {
				channels: req.data.channels
			}
		};
	};
</script>

<script lang="ts">
	import NavPanel from '$lib/components/NavPanel.svelte';
	import { ApolloClient } from '@apollo/client/core';
	import { HttpLink } from '@apollo/client/link/http';
	import { InMemoryCache } from '@apollo/client/cache';
	import { setContext } from '@apollo/client/link/context';
	import { setClient } from 'svelte-apollo';

	export let channels: Channel[];

	const httpLink = new HttpLink({
		uri: '/graphql'
	});
	const authLink = setContext((_, { headers }) => {
		/*const token = $tokenStore;*/
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				/*authorization: token ? `Bearer ${token}` : ''*/
			}
		};
	});
	const rootClient = new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache()
	});
	setClient(rootClient);
</script>

<div class="grid-container">
	<div class="grid-left">
		<NavPanel {channels} />
	</div>
	<div class="grid-center">
		<slot />
	</div>
	<div class="grid-right">right</div>
</div>

<style>
	.grid-left {
		grid-area: left;
	}
	.grid-center {
		grid-area: center;
	}
	.grid-right {
		grid-area: right;
	}

	.grid-container {
		display: grid;
		grid-template-areas: 'left center right';
		min-height: 100vh;
		overflow-y: hidden;
	}

	:global(body) {
		margin: 0;
	}
</style>
