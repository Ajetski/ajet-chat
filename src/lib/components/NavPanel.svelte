<script lang="ts">
	export let channels: { id: number; name: string }[];
</script>

<main>
	<ul>
		{#each channels as channel}
			<li>{channel.name}</li>
		{/each}
	</ul>
</main>
