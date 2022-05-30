<script lang="ts">
	import { mutation } from 'svelte-apollo';
	import { LOGIN } from '../queries/user.query';
	import type { Login } from '@graphql/types';

	import { tokenStore, userStore } from '../stores/user.store';

	let username = '';
	let password = '';

	const login = mutation(LOGIN);

	const handleLogin = async () => {
		const loginData = (
			(
				await login({
					variables: {
						username,
						password,
					},
				})
			).data as any
		).login as Login;
		tokenStore.set(loginData.token.toString());
		userStore.set(loginData.user);
	};
</script>

<main>
	<p>log in to send a message</p>
	<div>
		<label>
			username:
			<input type="text" bind:value={username} />
		</label>
	</div>
	<div>
		<label>
			password:
			<input type="password" bind:value={password} />
		</label>
	</div>
	<div>
		<button on:click={handleLogin}>login</button>
		<button on:click={() => alert('todo, not yet implemented')}
			>register</button>
	</div>
</main>

<style>
	div {
		margin: 1rem;
	}
</style>
