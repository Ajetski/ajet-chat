import type { UserRes } from '$lib/services/users.service';
import { writable } from 'svelte/store';

export const userStore = writable<UserRes>();

export const tokenStore = writable<string>();
