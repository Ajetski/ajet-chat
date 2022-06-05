<script lang="ts">
	import type { Message } from '@graphql/types';
	export let messages: Message[];
</script>

<main>
	{#each messages as message}
		<p>{message.author?.username}: {message.text}</p>
	{/each}
	<a href="/">home</a>
</main>
