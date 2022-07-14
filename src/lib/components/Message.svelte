<script lang="ts">
	import type { MessageType, Preview } from '$lib/client-types';

	export let message: MessageType | Preview;
	export let avatarUrl: string;

	const isPreview = (message: MessageType | Preview) =>
		(message as Preview).preview;
</script>

<main>
	<div class="container">
		<div>
			<img src={avatarUrl} alt="pfp" height="45px" />
		</div>
		<div>
			<div class="name">{message.author.username}</div>
			<div class="text" class:preview={isPreview(message)}>{message.text}</div>
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
		margin-left: 16px;
	}
	.preview {
		color: gray;
	}
</style>
