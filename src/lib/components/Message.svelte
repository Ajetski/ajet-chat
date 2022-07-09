<script lang="ts">
	export let messageText: string;
	export let authorName: string;
	export let avatarUrl: string;
</script>

<main>
	<div class="container">
		<div>
			<img src={avatarUrl} alt="pfp" height="45px" />
		</div>
		<div>
			<div class="name">{authorName}</div>
			<div class="text">{messageText}</div>
		</div>
	</div>
</main>

<style>
	.container {
		display: flex;
		flex-direction: row;
		font-size: 16px;
		padding: 20px 20px;
	}
	img {
		border-radius: 50%;
	}
	.name {
		font-weight: 900;
		margin-left: 16px;
	}
	.text {
		margin-left: 50px;
	}
</style>
