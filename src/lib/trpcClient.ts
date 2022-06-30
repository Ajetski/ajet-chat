// $lib/trpcClient.ts
import type { Router } from '$lib/trpcServer'; // 👈 only the types are imported from the server
import * as trpc from '@trpc/client';

export default trpc.createTRPCClient<Router>({ url: '/trpc' });
