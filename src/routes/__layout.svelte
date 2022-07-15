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
		<NavPanel {channels} {users} />
	</div>
	<div class="grid-center">
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
		background-color: var(--primary-100);
		padding-left: 15px;
		padding-top: 15px;
	}
	.grid-center {
		grid-area: center;
	}
	.grid-right {
		grid-area: right;
		background-color: var(--primary-100);
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
		background-color: var(--secondary-100);
	}
	:global(:root) {
		font-family: proxima-nova;
		color: var(--light-gray);
		
		--secondary-100: #1b1b23;
		--primary-100: #3E103E;
		--primary-200: #4c284c;
		--light-gray: #c1c1c1;
		--green-activity: #61bc4b;
		--yellow-activity: #f9ff40;
		--red-activity: #ac2929;
	}
	:global(body, html) {
		margin: 0;
		scroll-behavior: smooth;
	}
</style>
