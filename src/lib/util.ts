import type { Writable } from 'svelte/store';
export const promisifyStore = <T>(store: Writable<T>): Promise<T> => {
    return new Promise((resolve, reject) => {
        store.subscribe(async (val: T) => {
            resolve(val);
        })
    })
};