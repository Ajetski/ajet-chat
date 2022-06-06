<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Message } from '@graphql/types';
	import { Event } from '$shared/event';
	import { socket } from '$lib/stores/socket.store';
	import VoiceChat from '$lib/components/VoiceChat.svelte';

	export let messages: Message[];
	export let channelId: number;

	$socket.on(Event.Message, (data) => {
		console.log('message:', data);
	});
</script>

<main in:fade>
	{#each messages as message}
		<p>{message.author?.username}: {message.text}</p>
	{/each}
	<VoiceChat {channelId} />
</main>
