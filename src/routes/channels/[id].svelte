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
	import client from '$lib/trpc/client';
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
	<div class="grid">
		<div class="messages">
			{#each messages as message}
				<Message
					messageText={message.text}
					authorName={message.author.username}
					avatarUrl="https://u.cubeupload.com/Moonlight0619/pfp.png" />
			{/each}
		</div>
		<div class="sender-box">
			<div class="sender">
				<button class="attachment-btn">+</button>
				<textarea rows={1} placeholder="type yo shit here..." />
			</div>
		</div>
	</div>
	<!--<VoiceChat {channelId} />-->
</main>

<style>
	main {
		background-color: #1b1b23;
		height: 100%;
	}
	.messages {
		grid-area: messages;
	}
	.grid {
		display: grid;
		grid-template-areas: 'messages' 'sender';
		grid-template-rows: auto 50px;
		height: 100%;
	}
	.sender-box {
		/*position: -webkit-sticky;  /* Safari */
		/*position: sticky; */
		/*bottom: 0; */
		grid-area: sender;
		height: 100%;
	}
	.sender {
		display: grid;
		grid-template-columns: 30px auto;
		grid-template-areas: 'btn box';
	}
	.attachment-btn {
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
		padding: 0;
		grid-area: btn;
		border: none;
		background-color: black;
		color: white;
	}
	textarea {
		padding-left: 0.5rem;
		resize: none;
		grid-area: box;
		border: none;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
	}
</style>
