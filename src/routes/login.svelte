<script lang="ts">
	import client from '$lib/trpc/client';
	import { fade } from 'svelte/transition';
	import TitleHeader from '$lib/components/TitleHeader.svelte';
	import { userStore } from '$lib/stores/user.store';
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';

	const handleLogin = async () => {
		try {
			userStore.set(await client().mutation('login', { username, password }));
			goto('/channels/1');
		} catch (e) {
			console.error(e);
		}
	};

	const handleRegister = async () => {
		try {
			userStore.set(await client().mutation('register', { username, password }));
			// @TODO: set a cookie that contains a token and an expiration date of now + 30 days
			goto('/channels/1');
		} catch (e) {
			console.error(e);
		}
		
	}
</script>

<main in:fade>
	<TitleHeader />
	<div class="panel">
		<h2>Login</h2>
		<div class="login-row">
			<label for="username">Username: </label>
			<input type="text" name="username" id="username" bind:value={username} />
		</div>
		<div class="login-row">
			<label for="password">Password: </label>
			<input type="password" name="password" id="password" bind:value={password} />
		</div>
		<div class="login-row">
			<button type="button" on:click={handleLogin}>Login</button>
			<button type="button" on:click={handleRegister}>Register</button>
		</div>
	</div>
</main>

<style>
	.panel {
		justify-content: baseline;
		align-items: center;
		padding: 0.5rem 1rem;
		margin: 12.25% 25%;
		border: 0.25rem solid var(--primary-100);
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
	}
	.login-row,
	h2 {
		width: calc(100% - 2rem);
		padding: 0.5rem 2rem;
	}
	.login-row label {
		width: 6rem;
	}
	.login-row button {
		padding: 0.5rem 1rem;
		background-color: var(--primary-100);
		color: var(--light-gray);
		border: none;
		border-radius: 1rem;
		margin-right: 1rem;
	}
</style>
