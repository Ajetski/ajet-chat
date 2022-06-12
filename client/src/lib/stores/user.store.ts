import { writable } from 'svelte/store';
import type { User } from '@graphql/types';

export const userStore = writable<User>();

export const tokenStore = writable<string>();
