<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { client } from '$lib/client';
	import { GET_MESSAGES } from '$lib/queries/message.query';

	export const load: Load = async ({ params }) => {
		const messages = await client
			.request<{ messages: Message[] }>(GET_MESSAGES, {
					channelId: +params.id,
					pageInfo: {
						pageNumber: 0,
						pageLength: 30
					}
			})
			.catch((err) => {
				throw JSON.stringify(err);
			});
		return {
			props: {
				messages: messages.messages,
				channelId: params.id
			}
		};
	};
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Message } from '$shared/graphql';
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
