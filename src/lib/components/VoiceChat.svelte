<script lang="ts">
	import {
		textChannelStore,
		voiceChannelStore,
	} from '$lib/stores/channel.store';
	import { userStore } from '$lib/stores/user.store';
	import { socket } from '$lib/stores/socket.store';
	import { Event } from '$lib/event';
	import { onMount } from 'svelte';
	import type { InferQueryOutput } from '$lib/trpc/client';

	let peerId: string;
	let peer: any;
	let localStream: MediaStream;
	let remoteStream: MediaStream = new MediaStream();
	onMount(async () => {
		localStream = await navigator.mediaDevices
			.getUserMedia({
				audio: true,
			});
	});
	onMount(async () => {
		const Peer = (await import('peerjs')).default;
		peer = new Peer(undefined as unknown as string, {
			host: import.meta.env.VITE_P2P_HOST,
			path: '/myapp',
			secure: true,
		});
		peer.on('open', () => {
			peerId = peer?.id;
		});
		peer.on('call', (call: any) => {
			console.log('user called me', call.peer);
			call.answer(localStream); // Answer the call with an A/V stream.
			call.on('stream', (callStream: MediaStream) => {
				callStream.getAudioTracks().forEach((track: MediaStreamTrack) => {
					remoteStream.addTrack(track);
				});
			});
		});
	});

	const makeCall = (callPeer: string) =>
		new Promise<MediaStream>((resolve) => {
			const call = peer?.call(callPeer, localStream);
			call.on('stream', (remoteStream: MediaStream) => {
				resolve(remoteStream);
			});
			console.log('called new user', callPeer);
		});

	$socket.on(
		Event.JoinVoiceChat,
		async (channel: InferQueryOutput<'getChannelById'>, joinPeer: string) => {
			console.log('user joined channel', channel, joinPeer, peerId);
			if (peerId !== joinPeer) {
				await makeCall(joinPeer);
			}
			if ($userStore.voiceChannel || peerId === joinPeer) {
				console.log('updating user store');
				userStore.update(($user) => ({
					...$user,
					voiceChannel: channel,
				}));
			}
			textChannelStore.update(($channel) => channel);
		},
	);

	$socket.on(
		Event.LeaveVoiceChat,
		async (channel: InferQueryOutput<'getChannelById'>, leavePeer: string) => {
			console.log('user left channel', channel, leavePeer);
			if (peerId === leavePeer || !$userStore.voiceChannel) {
				userStore.update(($user) => ({
					...$user,
					voiceChannel: null,
				}));
			} else {
				userStore.update(($user) => ({
					...$user,
					voiceChannel: channel,
				}));
			}
			textChannelStore.update(($channel) => channel);
		},
	);

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

	const joinVoiceChat = () =>
		$socket.emit(
			Event.JoinVoiceChat,
			$userStore.id,
			$textChannelStore.id,
			peerId,
		);

	const leaveVoiceChat = () =>
		$socket.emit(
			Event.LeaveVoiceChat,
			$userStore.id,
			$textChannelStore.id,
			peerId,
		);
</script>

<main>
	{#if $voiceChannelStore}
		<h2 style="margin: 0;">{$voiceChannelStore.name}</h2>
		<div style="padding: 0 0 0 1rem;">
			<div class="joinable">
				<h3>Voice</h3>
				{#if !$userStore.voiceChannel}
					<button type="button" class="join-btn" on:click={joinVoiceChat}
						>Join</button>
				{:else}
					<button type="button" class="leave-btn" on:click={leaveVoiceChat}
						>Leave</button>
					<audio use:srcObject={remoteStream} />
				{/if}
			</div>
			{#each $voiceChannelStore?.chatters ?? [] as user, userIdx}
				<div class="vc-user">
					<img
						class="profile-pic"
						src="https://u.cubeupload.com/Moonlight0619/pfp.png"
						alt="profile pic" />
					<h4 class="username">{user.username}</h4>
					<button type="button">
						<img src="" alt="" />
					</button>
					<button type="button">
						<img src="" alt="" />
					</button>
				</div>
			{/each}
			<!-- <div class="joinable">
				<h3>Stream</h3>
				<button type="button">Join</button>
			</div> -->
		</div>
	{/if}
</main>

<style>
	.joinable {
		display: flex;
		height: 3rem;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.joinable button {
		height: 1.5rem;
		border: none;
		border-radius: 1rem;
		color: white;
		cursor: pointer;
	}

	.join-btn {
		width: 2.5rem;
		background-color: var(--green-activity);
	}
	.leave-btn {
		width: 3rem;
		background-color: var(--red-activity);
	}
	.vc-user {
		height: 2.5rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 25% 0 0;
	}
	.profile-pic {
		width: 2rem;
		height: 2rem;
		border-radius: 1rem;
	}
	.username {
		width: 6rem;
		overflow-x: hidden;
	}
</style>
