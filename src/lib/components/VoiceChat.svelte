<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Channel } from '$shared/graphql';
	import { socket } from '$lib/stores/socket.store';
	import { Event } from '$shared/event';

	export let channelId: number;

	let voiceChat: {
		joined: boolean;
		connectedUsers: {
			peerId: string;
			remoteStream: MediaStream;
		}[];
	} = {
		joined: false,
		connectedUsers: [],
	};

	let peerId: string;
	let peer: any;
	let localStream: MediaStream;
	(async () => {
		if (typeof navigator !== 'undefined') {
			localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
		}
	})();
	(async () => {
		if (typeof navigator !== 'undefined') {
			const Peer = (await import('peerjs')).default;
			peer = new Peer(undefined as unknown as string, {
				host: import.meta.env.VITE_P2P_HOST,
				path: '/myapp',
				secure: true,
			});
			peer.on('open', () => {
				peerId = peer?.id;
			});
			peer.on('call', async (call: any) => {
				call.answer(localStream); // Answer the call with an A/V stream.
				console.log('user called me', call.peer);
				call.on('stream', (remoteStream: MediaStream) => {
					voiceChat.connectedUsers = [
						...voiceChat.connectedUsers,
						{
							peerId: call.peer,
							remoteStream,
						},
					];
				});
			});
		}
	})();

	const makeCall = (peerId: string) =>
		new Promise<MediaStream>(async (resolve) => {
			const call = peer?.call(peerId, localStream);
			call.on('stream', (remoteStream: MediaStream) => {
				resolve(remoteStream);
			});
		});
	$socket.on(Event.JoinVoiceChat, async (channel: Channel, peerId: string) => {
		if (voiceChat.joined) {
			console.log('user join channel', channel, peerId);
			const remoteStream = await makeCall(peerId);
			voiceChat.connectedUsers = [
				...voiceChat.connectedUsers,
				{
					peerId,
					remoteStream,
				},
			];
		}
	});

	$socket.on(Event.LeaveVoiceChat, async (channel: Channel, peerId: string) => {
		if (voiceChat.joined) {
			console.log('user left channel', channel, peerId);
			voiceChat.connectedUsers = voiceChat.connectedUsers.filter(
				(u) => u.peerId !== peerId,
			);
		}
	});

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

	const joinVoice = async () => {
		voiceChat = {
			joined: true,
			connectedUsers: [],
		};
		$socket.emit(Event.JoinVoiceChat, channelId, peerId);
	};

	const leaveChannel = async () => {
		$socket.emit(Event.LeaveVoiceChat, channelId, peerId);
		voiceChat = {
			joined: false,
			connectedUsers: [],
		};
	};
</script>

<main>
	{#if voiceChat.joined}
		<p>num users: {voiceChat.connectedUsers.length + 1}</p>
		{#each voiceChat.connectedUsers as { peerId, remoteStream }}
			<p>{peerId}</p>
			<audio use:srcObject={remoteStream} autoplay />
		{/each}
		<button on:click={leaveChannel}>leave</button>
	{:else if peerId !== undefined}
		<button in:fade on:click={joinVoice}>join</button>
	{/if}
</main>
