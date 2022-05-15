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
	import Home from './components/Home.svelte';

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
	let video1: HTMLVideoElement;
	navigator.mediaDevices
		.getUserMedia({
			audio: false,
			video: true,
		})
		.then((stream) => {
			video1.srcObject = stream;
			video1.play();
		});
	let video2: HTMLVideoElement;
	let peerId = '';
	let myId = 'loading...';
	const peer = new Peer(undefined, {
		host: 'localhost',
		port: 9000,
		path: '/p2p',
	});
	peer.on('open', () => {
		myId = peer.id;
	});
	const makeCall = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true,
		});
		const call = peer.call(peerId, stream);
		call.on('stream', (remoteStream) => {
			video2.srcObject = remoteStream;
			video2.play();
		});
	};
	peer.on('call', async (call) => {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true,
		});
		call.answer(stream); // Answer the call with an A/V stream.
		call.on('stream', (remoteStream) => {
			video2.srcObject = remoteStream;
			video2.play();
		});
	});
</script>

<main>
	<Home />
	<br /><br />
	<h2>video calling:</h2>
	<label>
		id to call:
		<input type="text" bind:value={peerId} />
	</label>
	<button on:click={makeCall}>call</button><br />
	<p>your id is: {myId}</p>
	<video bind:this={video1}><track kind="captions" /></video>
	<video bind:this={video2}><track kind="captions" /></video>
</main>
