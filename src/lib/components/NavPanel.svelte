<script lang="ts">
	import {
		textChannelStore,
		voiceChannelStore,
	} from '$lib/stores/channel.store';
	import { userStore } from '$lib/stores/user.store';
	import type { InferQueryOutput } from '$lib/trpc/client';
	import { socket } from '$lib/stores/socket.store';
	import { Event } from '$lib/event';

	export let channels: InferQueryOutput<'getChannels'>;
	export let dmChannels: InferQueryOutput<'getDmChannels'>;
	export let users: InferQueryOutput<'getUsers'>;
	export let avatarUrl: string;

	let showChannels = false;
	const toggleChannelList = () => {
		showChannels = !showChannels;
	};
	let showDms = false;
	const toggleDirectMessage = () => {
		showDms = !showDms;
	};

	const joinTextChat = (channel: InferQueryOutput<'getChannelById'>) =>
		textChannelStore.set(channel);
	const joinVoiceChat = (channel: InferQueryOutput<'getChannelById'>) => {
		$socket.emit(Event.JoinVoiceChat, $textChannelStore.id, $userStore.id);
		userStore.update(($user) => ({
			...$user,
			voiceChannel: channel,
		}));
	};
</script>

<main>
	<div class="clickable" on:click={toggleDirectMessage}>
		<span class="section-title">Direct Message</span>
		<span class="dropdown-symbol">{showDms ? '-' : '>'}</span>
	</div>
	{#if showDms}
		<ul>
			{#each dmChannels as dmChannel}
				<a href={`/dms/${dmChannel.id}`}>
					<li>
						{dmChannel.otherUser.username}
					</li>
				</a>
			{/each}
		</ul>
	{/if}
	<div class="divider" />
	<div class="clickable" on:click={toggleChannelList}>
		<span class="section-title">Channel List</span>
		<span class="dropdown-symbol">{showChannels ? '-' : '>'}</span>
	</div>
	{#if showChannels}
		<ul>
			{#each channels as channel}
				<a href="/channels/{channel.id}" on:click={() => joinTextChat(channel)}>
					<li>{channel.name}</li>
				</a>
			{/each}
		</ul>
	{/if}
	<div class="divider" />
	<div class="section-title server-users-title">Server Users</div>
	<ul>
		{#each users as user}
			<li class="server-user">
				<img src={avatarUrl} alt="pfp" height="45px" />
				{user.username}
			</li>
		{/each}
	</ul>
</main>

<style>
	.clickable:hover {
		cursor: pointer;
	}
	.clickable,
	.server-users-title {
		margin: 0.5rem;
	}
	.divider {
		border-bottom: 1px solid grey;
		margin-right: 1rem;
	}
	.dropdown-symbol {
		float: right;
		margin-right: 1rem;
	}
	.section-title {
		font-size: 20px;
		font-weight: bolder;
	}
	a {
		text-decoration: none;
		color: lightgray;
	}
	img {
		border-radius: 50%;
		height: 48px;
	}
	.server-user {
		list-style-type: none;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 0 1rem 0;
	}
	.server-user img {
		padding: 0 0.5rem;
	}
</style>
