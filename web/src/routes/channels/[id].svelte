<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Message } from '@graphql/types';
	export let messages: Message[];
</script>

<main in:fade>
	{#each messages as message}
		<p>{message.author?.username}: {message.text}</p>
	{/each}
	<a href="/">home</a>
</main>
