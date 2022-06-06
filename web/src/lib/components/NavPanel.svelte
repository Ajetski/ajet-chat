<script lang="ts">
	import type { Channel } from '@graphql/types';

	export let channels: Channel[];
</script>

<main>
	<ul>
		{#each channels as channel}
			<li>{channel.name}</li>
		{/each}
	</ul>
</main>
