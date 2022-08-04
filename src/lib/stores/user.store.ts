import type { UserRes } from '$lib/services/users.service';
import type { InferMutationOutput } from '$lib/trpc/client';
import { writable } from 'svelte/store';

export const userStore = writable<InferMutationOutput<'login'>>();

export const tokenStore = writable<string>();
