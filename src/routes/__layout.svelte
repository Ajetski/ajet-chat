<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	//import { server } from '$app/env';

	export const load: Load = async () => {
		//if (server) {
		return {
			props: {
				username: 'nhavasi',
				pfp: 'https://u.cubeupload.com/Moonlight0619/pfp.png',
			},
		};
		//}
	};
</script>

<script lang="ts">
	import TitleHeader from '$lib/components/TitleHeader.svelte';
	export let username: string;
	export let pfp: string;
</script>

<TitleHeader {username} {pfp} />
<slot />

<!--<script lang="ts">
	import NavPanel from '$lib/components/NavPanel.svelte';

	export let channels: Channel[];
</script>

<div class="grid-container">
	<div class="grid-left">
		<NavPanel {channels} />
	</div>
	<div class="grid-center">
		<slot />
	</div>
	<div class="grid-right">right</div>
</div>

<style>
	.grid-left {
		grid-area: left;
	}
	.grid-center {
		grid-area: center;
	}
	.grid-right {
		grid-area: right;
	}

	.grid-container {
		display: grid;
		grid-template-areas: 'left center right';
		min-height: 100vh;
		overflow-y: hidden;
	}-->
<style>
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
