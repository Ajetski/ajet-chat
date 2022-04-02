<script>
	// @ts-nocheck

	import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';
	import { setClient, query } from 'svelte-apollo';

	const client = new ApolloClient({
		uri: 'http://localhost:4000/graphql',
		cache: new InMemoryCache(),
	});
	setClient(client);

	const POSTS = gql`
		query Query($pageInfo: PageInfo) {
			posts(pageInfo: $pageInfo) {
				id
				text
				poster {
					username
				}
				hasMedia
			}
		}
	`;

	let pageInfo = {
		pageLength: 20,
		pageNumber: 0,
	};
	const posts = query(POSTS, {
		variables: { pageInfo },
	});

	const reload = () => posts.refetch();
</script>

<main>
	<h2>Posts:</h2>
	<ul>
		{#if $posts.loading}
			<li>Loading...</li>
		{:else if $posts.error}
			<li>ERROR: {$posts.error.message}</li>
		{:else}
			{#each $posts.data.posts as post}
				<li>
					{post.poster.username}: {post.text}
					{#if post.hasMedia}
						<i>&nbsp; &nbsp; has media</i>
					{/if}
				</li>
			{/each}
		{/if}
	</ul>
</main>
