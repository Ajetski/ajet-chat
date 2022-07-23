import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (id) => /^\d+$/.test(id);
