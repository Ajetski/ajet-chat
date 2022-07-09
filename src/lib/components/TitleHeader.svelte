<script lang="ts">
	export let username: string;
	export let pfp: string;
</script>

<main>
	<div class="header">
		<div class="flex-container">
			AJET-CHAT
			<div class="flex-activity" />
			<div class="flex-item">{username}</div>
			<div class="flex-item">
				<img src={pfp} alt="pfp" height="32x" />
			</div>
		</div>
	</div>
</main>

<style>
	main {
		height: 100%;
	}
	.header {
		display: block;
		background-color: black;
		height: 100%;
	}
	.flex-container {
		font-weight: 900;
		font-size: 26px;

		display: flex;
		flex-direction: row;

		padding: 8px 30px 0px 30px;
	}
	.flex-activity {
		display: inline-block;
		margin: auto 0px auto auto;
		height: 16px;
		width: 4px;
		border-radius: 50%;
		background-color: var(--green-activity);
	}
	.flex-activity,
	.flex-item {
		padding-left: 12px;
	}
	img {
		border-radius: 50%;
	}
	hr {
		margin: 0;
		padding: 0;
		background-color: #707070;
		height: 4px;
		border: 0;
	}
</style>
