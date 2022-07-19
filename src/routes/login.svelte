<script context="module" lang="ts">
    import client from '$lib/trpc/client';
</script>

<script lang="ts">
    import { fade } from 'svelte/transition';
    import TitleHeader from '$lib/components/TitleHeader.svelte';

    const handleLogin = async (loginInfo: any) => {
        // login logic
    }
</script>

<main in:fade>
    <TitleHeader></TitleHeader>
    <div class="panel">
        <h2>Login</h2>
        <div class="login-row">
            <label for="username">Username: </label>
            <input type="text" name="username" id="username">
        </div>
        <div class="login-row">
            <label for="password">Password: </label>
            <input type="password" name="password" id="password">
        </div>
        <div class="login-row">
            <button type="button">Login</button>
            <button type="button">Register</button>
        </div>
    </div>
</main>

<style>
    .panel{
        justify-content: baseline;
        align-items: center;
        padding: 0.5rem 1rem;
        margin: 12.25% 25%;
        border: 0.25rem solid var(--primary-100);
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
    }
    .login-row, h2 {
        width: calc(100% - 2rem);
        padding: 0.5rem 2rem;
    }
    .login-row label {
        width: 6rem
    }
    .login-row button {
        padding: 0.5rem 1rem;
        background-color: var(--green-activity);
        color: var(--light-gray);
        border: none;
        border-radius: 1rem;
        margin-right: 1rem;
    }
</style>