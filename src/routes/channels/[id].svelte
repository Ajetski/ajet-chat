<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import client, { type InferQueryOutput } from '$lib/trpc/client';

	export const load: Load = async ({ params, fetch }) => ({
		props: {
			messages: await client(fetch).query('getMessages', {
				channelId: +params.id,
				pageInfo: {
					pageLength: 30,
					pageNumber: 0,
				},
			}),
			channelId: +params.id,
		},
	});
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import Message from '$lib/components/Message.svelte';
	import type { MessageType, Preview } from '$lib/client-types';

	export let messages: ( MessageType | Preview)[];
	export let channelId: number;

	let msgInput = '';

	const handleSendMessage = async (e: KeyboardEvent) => {
		if (e.code === 'Enter') {
			console.log('sending message:', msgInput);
			const newMessage = {
				msgInfo: {
					author: {
						connect: {
							id: 1,
						},
					},
					text: msgInput,
					channel: {
						connect: {
							id: channelId,
						},
					},
				},
			}
			messages = [{preview: true, author: {id: 1, username: 'test user'}, text: msgInput}, ...messages];

			const res = await client().mutation('createMessage', newMessage);
			msgInput = '';

			messages = messages.map(el => {
				const p = el as Preview; 
				if(p.preview){
					return res;
				}
				return el;
			});
		}
	};
</script>

<main in:fade>
	<div class="grid">
		<div class="messages">
			{#each messages as message}
				<Message
					message={message}
					avatarUrl="https://u.cubeupload.com/Moonlight0619/pfp.png"
				/>
			{/each}
		</div>
		<div class="sender-box">
			<div class="sender">
				<button class="attachment-btn">
					+
				</button>
				<textarea
					class="text-box"
					rows={1}
					placeholder="message"
					bind:value={msgInput}
					on:keypress={handleSendMessage} />
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
		display: flex;
		flex-direction: column-reverse;
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
	.text-box {
		background-color: rgb(86, 40, 86);
		color: lightgray;
	}
</style>
