// $lib/trpcClient.ts
import { browser } from '$app/env';
import type { Router } from '$lib/trpcServer'; // 👈 only the types are imported from the server
import * as trpc from '@trpc/client';

const url = browser ? '/trpc' : 'http://localhost:3000/trpc';
export default trpc.createTRPCClient<Router>({ url });
