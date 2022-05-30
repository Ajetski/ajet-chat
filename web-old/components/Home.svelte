<script lang="ts">
	import CreatePost from './CreatePost.svelte';
	import Posts from './Posts.svelte';
	import { userStore } from '../stores/user.store';
	import Login from '../components/Login.svelte';
</script>

<main>
	<h2>Posts:</h2>
	<Posts />
	{#if $userStore}
		<CreatePost />
	{:else}
		<Login />
	{/if}
</main>
