import { io } from 'socket.io-client';
import { writable } from 'svelte/store';

export const socket = writable(io(import.meta.env.VITE_WS_ENDPOINT));
