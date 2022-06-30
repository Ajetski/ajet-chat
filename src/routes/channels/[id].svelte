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
	export let messages: unknown[];
	export let channelId: number;
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
