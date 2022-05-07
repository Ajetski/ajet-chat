<script lang="ts">
	import { query, ReadableQuery } from 'svelte-apollo';
	import { POSTS } from '../queries/post.query';
	import type { Post } from '@graphql/types';

	let pageInfo = {
		pageLength: 20,
		pageNumber: 0,
	};
	const posts: ReadableQuery<{
		posts: Post[];
	}> = query(POSTS, {
		variables: { pageInfo },
	});
</script>

<main>
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
