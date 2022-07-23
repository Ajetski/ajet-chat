<script lang="ts">
	import type { InferQueryOutput } from '$lib/trpc/client';

	export let channels: { id: number; name: string }[];
	export let dmChannels: InferQueryOutput<'getDmChannels'>;
	export let users: { id: number; username: string }[];
	export let avatarUrl: string;

	let showChannels = false;
	const toggleChannelList = () => {
		showChannels = !showChannels;
	};
	let showDms = false;
	const toggleDirectMessage = () => {
		showDms = !showDms;
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
				<a href="/channels/{channel.id}">
					<li>{channel.name}</li>
				</a>
			{/each}
		</ul>
	{/if}
	<div class="divider" />
	<div class="section-title server-users-title">Server Users</div>
	<ul>
		{#each users as user}
			<li class="server-user-list">
				<img src={avatarUrl} alt="pfp" height="45px" />{user.username}
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
		margin-top: 5px;
		margin-bottom: 5px;
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
	.server-user-list {
		list-style-type: none;
	}
</style>
