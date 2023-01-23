import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

const pb = new PocketBase('https://schule-projekt-pocketbase.jerebtw.de'); 

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log('authStore changed', auth);
    currentUser.set(pb.authStore.model);
});