<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import client, { type InferQueryOutput } from '$lib/trpc/client';

	export const load: Load = async ({ params, fetch }) => {
		return {
			props: {
				messages: await client(fetch).query('getMessages', {
					channelId: +params.id,
					pageInfo: {
						pageLength: 30,
						pageNumber: 0,
					},
				}),
			},
		};
	};
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import Message from '$lib/components/Message.svelte';

	export let messages: InferQueryOutput<'getMessages'>;

	let msgInput = '';

	const handleSendMessage = (e: KeyboardEvent) => {
		if (e.code === 'Enter') {
			console.log('sending message', msgInput);
			// TODO: send msg here
			msgInput = '';
		}
	}
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
				<textarea rows={1} placeholder="type yo shit here..." bind:value={msgInput} on:keypress={handleSendMessage} />
			</div>
		</div>
	</div>
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
