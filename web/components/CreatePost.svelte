<script lang="ts">
	import { mutation } from 'svelte-apollo';
	import { CREATE_POST } from '../queries/post.query';

	const createPost = mutation(CREATE_POST);

	let message = '';

	const sendMessage = () =>
		createPost({
			variables: {
				post: {
					text: message,
				},
			},
		});
</script>

<main>
	<div>
		<label>message<input type="text" bind:value={message} /></label>
	</div>
	<div>
		<button on:click={sendMessage}>send message</button>
	</div>
</main>
