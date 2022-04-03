<script lang="ts">
	import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';
	import { setClient, query, ReadableQuery } from 'svelte-apollo';
	import type { Post } from '@graphql/types';

	const client = new ApolloClient({
		uri: '/graphql',
		cache: new InMemoryCache(),
	});
	setClient(client);

	const POSTS = gql`
		query Query($pageInfo: PageInfo) {
			posts(pageInfo: $pageInfo) {
				text
				poster {
					username
				}
				mediaUrl
			}
		}
	`;

	let pageInfo = {
		pageLength: 20,
		pageNumber: 0,
	};
	const posts: ReadableQuery<{
		posts: Post[];
	}> = query(POSTS, {
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
					{#if post.mediaUrl}
						<img src={post.mediaUrl} alt="post media" />
					{/if}
				</li>
			{/each}
		{/if}
	</ul>
</main>
