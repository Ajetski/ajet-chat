<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	//import { server } from '$app/env';

	export const load: Load = async ({ fetch }) => {
		return {
			props: {
				username: 'nhavasi',
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
			},
		};
	};
</script>

<script lang="ts">
	import TitleHeader from '$lib/components/TitleHeader.svelte';
	import NavPanel from '$lib/components/NavPanel.svelte';
	import type { InferQueryOutput } from '$lib/trpc/client';
	import client from '$lib/trpc/client';

	export let username: string;
	export let pfp: string;
	export let channels: InferQueryOutput<'getChannels'>;
	export let users: InferQueryOutput<'getUsers'>;
</script>

<div class="grid-container">
	<div class="grid-top">
		<TitleHeader {username} {pfp} />
	</div>
	<div class="grid-left">
		<NavPanel
			{channels}
			{users}
			avatarUrl={'https://u.cubeupload.com/Moonlight0619/pfp.png'} />
	</div>
	<div class="grid-center">
		<slot />
	</div>
	<div class="grid-right">
		<h2 style="margin: 0;">Text-Channel-Name</h2>
		<div style="padding: 0 0 0 1rem;">
			<div class="joinable">
				<h3>Voice</h3>
				<button type="button">Join</button>
			</div>
			{#each users as user}
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
	</div>
</div>

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
		width: 2.5rem;
		border: none;
		border-radius: 1rem;
		background-color: var(--green-activity);
		color: white;
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
	.grid-top {
		grid-area: top;
		border-bottom: 2px solid grey;
	}
	.grid-left {
		grid-area: left;
		background-color: var(--primary-100);
		padding: 0 1rem 1rem;
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
