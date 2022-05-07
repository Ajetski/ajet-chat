import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import { writable } from 'svelte/store';

export const clientStore = writable<ApolloClient<NormalizedCacheObject>>();
