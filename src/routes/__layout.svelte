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
	import { onMount } from 'svelte';

	export let username: string;
	export let pfp: string;
	export let channels: InferQueryOutput<'getChannels'>;
	export let users: InferQueryOutput<'getUsers'>;
	
	onMount(()=> {
		const elem = document.getElementById('MessageLog');
		if (elem) {
			console.log(elem.scrollHeight);
			elem.scrollTop = elem.scrollHeight;
			console.log('New',elem.scrollTop);
		}
	})
</script>

<div class="grid-container">
	<div class="grid-top">
		<TitleHeader {username} {pfp} />
	</div>
	<div class="grid-left">
		<NavPanel {channels} {users} />
	</div>
	<div class="grid-center" id="MessageLog">
		<slot />
	</div>
	<div class="grid-right">Text-Channel-Name</div>
</div>

<style>
	.grid-top {
		grid-area: top;
		border-bottom: 2px solid grey;
	}
	.grid-left {
		grid-area: left;
		background-color: rgb(62, 16, 62);
		padding-left: 15px;
		padding-top: 15px;
	}
	.grid-center {
		grid-area: center;
		max-height: calc(100vh - 60px);
		overflow-y: scroll;
	}
	.grid-right {
		grid-area: right;
		background-color: rgb(62, 16, 62);
		padding-left: 15px;
		padding-top: 15px;
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
		background-color: #1b1b23;
	}
	:global(:root) {
		font-family: proxima-nova;
		--light-gray: #c1c1c1;
		color: var(--light-gray);

		--green-activity: #61bc4b;
		--yellow-activity: #f9ff40;
		--red-activity: #ac2929;
	}
	:global(body, html) {
		margin: 0;
	}
</style>
