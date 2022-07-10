<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	//import { server } from '$app/env';

	export const load: Load = async () => {
		return {
			props: {
				username: 'nhavasi',
				pfp: 'https://u.cubeupload.com/Moonlight0619/pfp.png',
			},
		};
	};
</script>

<script lang="ts">
	import TitleHeader from '$lib/components/TitleHeader.svelte';
	import NavPanel from '$lib/components/NavPanel.svelte';

	export let username: string;
	export let pfp: string;
	let channels = [
		{
			id: 1,
			name: 'general',
		},
		{
			id: 2,
			name: 'cs-stuff',
		},
	];
	let users = [
		{
			id: 1,
			username: 'test user',
		},
		{
			id: 3,
			username: 'test user 2',
		},
	];
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
	<div class="grid-right">right</div>
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
	}
	.grid-right {
		grid-area: right;
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
