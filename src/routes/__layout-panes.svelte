<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	//import { server } from '$app/env';

	export const load: Load = async ({ fetch }) => {
		return {
			props: {
				pfp: 'https://u.cubeupload.com/Moonlight0619/pfp.png',
				users: await client(fetch).query('getUsers', {
					pageInfo: {
						pageLength: 30,
						pageNumber: 0,
					},
				}),
				channels: await client(fetch).query('getChannels', {
					pageInfo: {
						pageLength: 30,
						pageNumber: 0,
					},
				}),
				dmChannels: await client(fetch).query('getDmChannels', {
					userId: 1,
				}),
			},
		};
	};
</script>

<script lang="ts">
	import TitleHeader from '$lib/components/TitleHeader.svelte';
	import NavPanel from '$lib/components/NavPanel.svelte';
	import VoiceChat from '$lib/components/VoiceChat.svelte';
	import type { InferQueryOutput } from '$lib/trpc/client';
	import client from '$lib/trpc/client';
	import { userStore } from '$lib/stores/user.store';
	import { voiceChannelStore } from '$lib/stores/channel.store';
	import { goto } from '$app/navigation';

	export let pfp: string;
	export let channels: InferQueryOutput<'getChannels'>;
	export let users: InferQueryOutput<'getUsers'>;
	export let dmChannels: InferQueryOutput<'getDmChannels'>;

	// @TODO: get authenticated cookie and check if expirationDate < now
	if (!$userStore.id) {
		goto('/login');
	}
</script>

<div class="grid-container">
	<div class="grid-top">
		<TitleHeader username={$userStore.username} {pfp} />
	</div>
	<div class="grid-left">
		<NavPanel
			{dmChannels}
			{channels}
			{users}
			avatarUrl={'https://u.cubeupload.com/Moonlight0619/pfp.png'} />
	</div>
	<div class="grid-center">
		<slot />
	</div>
	<div class="grid-right">
		<VoiceChat channelId={$voiceChannelStore?.id} />
	</div>
</div>

<style>
	.grid-top {
		grid-area: top;
		border-bottom: 2px solid grey;
	}
	.grid-left {
		grid-area: left;
		background-color: var(--primary-100);
		padding: 0 1rem 1rem;
		max-height: calc(100vh - 4.75rem);
		overflow-y: scroll;
	}
	.grid-center {
		grid-area: center;
	}
	.grid-right {
		grid-area: right;
		background-color: var(--primary-100);
		padding: 0 1rem 1rem;
	}
	.grid-container {
		display: grid;
		grid-template-areas:
			'top top top'
			'left center right';
		grid-template-rows: 60px auto;
		grid-template-columns: 300px auto 300px;
		min-height: 100vh;
		overflow-y: hidden;
		background-color: var(--secondary-100);
	}
</style>
