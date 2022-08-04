<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import client from '$lib/trpc/client';
	import { userStore } from '$lib/stores/user.store';

	export const load: Load = ({ params, fetch }) => {
		return promisifyStore(userStore).then(async (user) => {
			if (!user) {
				return {
					status: 302,
					redirect: '/login',
				};
			} else {
				return {
					props: {
						messages: await client(fetch).query('getMessages', {
							channelId: +params.id,
							pageInfo: {
								pageLength: 30,
								pageNumber: 1,
							},
						}),
						channelId: +params.id,
					},
				};
			}
		});
	};
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import Message from '$lib/components/Message.svelte';
	import type { MessageType, Preview } from '$lib/client-types';
	import type { InferMutationOutput } from '$lib/trpc/client';
	import { socket } from '$lib/stores/socket.store';
	import { Event } from '$lib/event';
	import type { Prisma } from '@prisma/client';
	import { promisifyStore } from '$lib/util';
	export let messages: (MessageType | Preview)[];
	export let channelId: number;

	let msgInput = '';

	$socket.on(Event.Message, (msg: InferMutationOutput<'createMessage'>) => {
		if (channelId === msg.channelMessage?.channelId) {
			messages = [msg, ...messages].filter((el) => {
				const p = el as Preview;
				return !(p.preview && p.text === msg.text);
			});
		}
	});

	const sendMessage = async () => {
		const msgInfo: Prisma.MessageCreateInput = {
			author: {
				connect: {
					id: $userStore.id,
				},
			},
			text: msgInput,
			channelMessage: {
				create: {
					channel: {
						connect: {
							id: channelId,
						},
					},
				},
			},
		};

		messages = [
			{
				preview: true,
				author: $userStore,
				text: msgInput,
			},
			...messages,
		];

		msgInput = '';
		$socket.emit(Event.Message, msgInfo);
	};

	const handleButtonPress = (e: KeyboardEvent) => {
		if (e.code === 'Enter') {
			if (msgInput.trim()) sendMessage();
			else {
				e.preventDefault();
				msgInput = '';
			}
		}
	};
</script>

<main in:fade>
	<div class="grid" id="message-log">
		<div class="messages">
			{#each messages as message}
				<div class="message">
					<Message
						{message}
						avatarUrl="https://u.cubeupload.com/Moonlight0619/pfp.png" />
				</div>
			{/each}
		</div>
		<div class="sender-box">
			<div class="sender">
				<button class="attachment-btn"> + </button>
				<textarea
					class="text-box"
					rows={1}
					placeholder="message"
					bind:value={msgInput}
					on:keypress={handleButtonPress} />
			</div>
		</div>
	</div>
</main>

<style>
	main {
		background-color: var(--secondary-100);
		height: 100%;
	}
	.messages {
		grid-area: messages;
		flex: 1;
		height: 100%;
		overflow: auto;
		display: flex;
		flex-direction: column-reverse;
	}
	.message {
		height: 8vh;
	}
	.grid {
		display: grid;
		grid-template-areas: 'messages' 'sender';
		grid-template-rows: auto 50px;
		height: 100%;
		max-height: calc(100vh - 3.75rem);
		overflow-y: scroll;
		overflow-anchor: none;
	}
	.sender-box {
		position: -webkit-sticky; /* Safari */
		position: sticky;
		bottom: 0;
		grid-area: sender;
		height: 100%;
		background-color: var(--secondary-100);
		overflow-anchor: auto;
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
		background-color: var(--primary-200);
		color: lightgray;
	}
</style>
