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
	import type { Messages } from '$lib/services/message.service';
	import { browser } from '$app/env';
	import Message from '$lib/components/Message.svelte';
	export let messages: Messages;
	//export let channelId: number;

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
	<div class="message">
		{#each messages as message}
			<Message
				messageText={message.text}
				authorName={message.author.username}
				avatarUrl="https://u.cubeupload.com/Moonlight0619/pfp.png" />
		{/each}
	</div>
	<!--<VoiceChat {channelId} />-->
</main>

<style>
	main {
		background-color: #1b1b23;
	}
	.message {
		padding: 30px;
	}
</style>
