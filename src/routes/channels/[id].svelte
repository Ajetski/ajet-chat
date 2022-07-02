<script lang="ts">
	import { fade } from 'svelte/transition';
	/*import { Event } from '$shared/event';
	import { socket } from '$lib/stores/socket.store';
	import VoiceChat from '$lib/components/VoiceChat.svelte';

	export let messages: unknown[];
	export let channelId: number;

	$socket.on(Event.Message, (data) => {
		console.log('message:', data);
	});*/
	import client from '$lib/trpcClient';
	import { browser } from '$app/env';
	export let messages: unknown[];
	export let channelId: number;

	// trpc example
	if (browser)
		client
			.query('getMessages', {
				channelId: 1,
				pageInfo: {
					pageLength: 50,
					pageNumber: 0,
				},
			})
			.then((res) => console.log(JSON.stringify(res)));
</script>

<main in:fade>
	<!--{#each messages as message}
		<p>{message.author?.username}: {message.text}</p>
	{/each}
	<VoiceChat {channelId} />
	<p>{message}</p>-->
	<p>{channelId}</p>
	<p>{JSON.stringify(messages)}</p>
</main>
