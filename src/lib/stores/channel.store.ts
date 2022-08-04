import type { InferQueryOutput } from '$lib/trpc/client';
import { writable, derived } from 'svelte/store';

import { userStore } from './user.store';

export const textChannelStore =
	writable<InferQueryOutput<'getChannels'>[number]>();

export const voiceChannelStore = derived(
	[userStore, textChannelStore],
	([$user, $channel]) => $user?.voiceChannel ?? $channel,
);
