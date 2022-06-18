<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { client } from '$lib/client';
	import { GET_CHANNELS } from '$lib/queries/channel.query';
	import type { Channel } from '$shared/graphql';

	export const load: Load = async () => {
		const req = await client
			.request<{ channels: Channel[] }>(
				GET_CHANNELS,
				{
					pageInfo: {
						pageNumber: 0,
						pageLength: 30
					}
				}
			)
			.catch((err) => {
				throw JSON.stringify(err);
			});
		return {
			props: {
				channels: req.channels
			}
		};
	};
</script>

<script lang="ts">
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
	}

	:global(body) {
		margin: 0;
	}
</style>
