<script lang="ts">
	import {
		ApolloClient,
		createHttpLink,
		InMemoryCache,
	} from '@apollo/client/core';
	import { setContext } from '@apollo/client/link/context';
	import { setClient } from 'svelte-apollo';
	import { tokenStore } from './stores/user.store';
	import Peer from 'peerjs';
	import { io } from 'socket.io-client';
	import { Event } from '../shared/event';
	import type { MessageInfo, Channel } from '@graphql/types';

	// Setup GraphQL client
	const httpLink = createHttpLink({
		uri: '/graphql',
	});
	const authLink = setContext((_, { headers }) => {
		const token = $tokenStore;
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : '',
			},
		};
	});
	const client = new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	});
	setClient(client);

	// Setup WebRTC video chat
	let localStream: MediaStream;
	let myPeerId = '';
	const peer = new Peer(undefined, {
		host: 'ajet-chat-p2p.herokuapp.com',
		path: '/myapp',
		secure: true,
	});
	peer.on('open', () => {
		myPeerId = peer.id;
	});
	const makeCall = (peerId: string) =>
		new Promise<MediaStream>((resolve) => {
			const call = peer.call(peerId, localStream);
			call.on('stream', (remoteStream) => {
				resolve(remoteStream);
			});
		});

	peer.on('call', async (call) => {
		call.answer(localStream); // Answer the call with an A/V stream.
		console.log('user called me', call.peer);
		call.on('stream', (remoteStream) => {
			currVoiceChat.connectedUsers.push({ peerId: call.peer, remoteStream });
			currVoiceChat = currVoiceChat; // trigger re-render
			console.log('vc', currVoiceChat);
		});
	});

	let message = '';

	const socket = io();
	socket.on(Event.Message, (data) => {
		console.log('message:', data);
	});
	socket.on(Event.JoinVoiceChat, async (channel: Channel, peerId: string) => {
		if (channel.id === currVoiceChat.channel.id) {
			console.log('user join channel', channel, peerId);
			currVoiceChat.connectedUsers.push({
				peerId,
				remoteStream: await makeCall(peerId),
			});
			currVoiceChat = currVoiceChat; // trigger re-render
			console.log('vc', currVoiceChat);
		}
	});

	socket.on(Event.LeaveVoiceChat, async (channel: Channel, peerId: string) => {
		if (channel.id === currVoiceChat.channel.id) {
			console.log('user left channel', channel, peerId);
			currVoiceChat.connectedUsers = currVoiceChat.connectedUsers.filter(
				(u) => u.peerId !== peerId,
			);
		}
	});

	const sendMessage = () => {
		const msg: MessageInfo = {
			channelId: 1,
			authorId: 1,
			text: message,
		};
		socket.emit(Event.Message, msg);
		message = '';
	};

	let channels: Channel[] = [{ id: 1, name: 'general' }];
	let currVoiceChat: {
		channel?: Channel;
		connectedUsers: {
			peerId: string;
			remoteStream: MediaStream;
		}[];
	} = {
		connectedUsers: [],
	};

	const srcObject = (node: HTMLAudioElement, stream: MediaStream) => {
		node.srcObject = stream;
		return {
			update(nextStream: MediaStream) {
				node.srcObject = nextStream;
			},
			destroy() {
				node.srcObject = null;
			},
		};
	};

	const joinChannel = async (channel: Channel) => {
		if (!localStream) {
			localStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
		}
		currVoiceChat = {
			channel,
			connectedUsers: [],
		};
		socket.emit(Event.JoinVoiceChat, currVoiceChat.channel, myPeerId);
	};

	const leaveChannel = async () => {
		localStream = null;
		socket.emit(Event.LeaveVoiceChat, currVoiceChat.channel, myPeerId);
		currVoiceChat = {
			channel: null,
			connectedUsers: [],
		};
	};
</script>

<main>
	<input type="text" bind:value={message} />
	<button on:click={sendMessage}>test</button>

	{#each channels as channel}
		<p class:bold={channel.id === currVoiceChat.channel?.id}>{channel.name}</p>
		{#if channel.id === currVoiceChat.channel?.id}
			<p>num users: {currVoiceChat.connectedUsers.length}</p>
			{#each currVoiceChat.connectedUsers as { peerId, remoteStream }}
				<p>{peerId}</p>
				<audio use:srcObject={remoteStream} autoplay />
			{/each}
			<button on:click={leaveChannel}>leave</button>
		{:else}
			<button on:click={() => joinChannel(channel)}>join</button>
		{/if}
	{/each}
</main>

