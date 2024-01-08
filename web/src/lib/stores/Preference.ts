import { browser } from '$app/environment';
import { WebStorage } from '$lib/WebStorage';
import { writable, type Writable } from 'svelte/store';

console.log('[preference store]');

// Persistent in relay => $lib/Preferences.ts

// Persistent in local
export const autoRefresh: Writable<boolean> = writable(true);
if (browser) {
	const storage = new WebStorage(localStorage);
	const autoRefreshString = storage.get('preference:auto-refresh');
	if (autoRefreshString !== null) {
		try {
			autoRefresh.set(JSON.parse(autoRefreshString));
		} catch (error) {
			console.error('[failed to parse auto-refresh]', autoRefreshString);
		}
	}
	autoRefresh.subscribe((value) => {
		console.log('[save auto-refresh]', value);
		storage.set('preference:auto-refresh', JSON.stringify(value));
	});
}

export const enablePreview = writable(
	browser ? new WebStorage(localStorage).get('preference:preview') !== 'false' : true
);

export const imageProxy: Writable<boolean> = writable(false);
export const imageProxyUrl: Writable<string> = writable('https://imgproxy.yabu.me');
export const imageProxySalt: Writable<string> = writable(
	'50c4f5a722f57fc34a8d453cfdd0c687e9779a0ae5ba047578967c9a69ca1e9b1b2595bd2b78237dec19bb5db33dea5f134ead1e79edb7dbe995e6c0dcfbf0a0'
);
export const imageProxyKey: Writable<string> = writable(
	'd3b13dda739ee62c0a36c5fbb5bcbb550fd777c1d58329f54b41a2fc85c0e1f23d65bb343af97508c7b5f512726d86680489732a8646570ddd02a0cc4d9dc1ef'
);

if (browser) {
	const storage = new WebStorage(localStorage);

	const imageProxyString = storage.get('preference:image-proxy:toggle');
	if (imageProxyString !== null) {
		try {
			imageProxy.set(JSON.parse(imageProxyString));
		} catch (error) {
			console.error('[failed to parse image-proxy toggle]', imageProxyString);
		}
	}
	const imageProxyUrlString = storage.get('preference:image-proxy:url');
	if (imageProxyUrlString !== null) {
		try {
			imageProxyUrl.set(JSON.parse(imageProxyUrlString));
		} catch (error) {
			console.error('[failed to parse image-proxy url]', imageProxyUrlString);
		}
	}
	const imageProxySaltString = storage.get('preference:image-proxy:salt');
	if (imageProxySaltString !== null) {
		try {
			imageProxySalt.set(JSON.parse(imageProxySaltString));
		} catch (error) {
			console.error('[failed to parse image-proxy salt]', imageProxySaltString);
		}
	}
	const imageProxyKeyString = storage.get('preference:image-proxy:key');
	if (imageProxyKeyString !== null) {
		try {
			imageProxyKey.set(JSON.parse(imageProxyKeyString));
		} catch (error) {
			console.error('[failed to parse image-proxy key]', imageProxyKeyString);
		}
	}

	imageProxy.subscribe((value) => {
		console.log('[save image-proxy toggle]', value);
		storage.set('preference:image-proxy:toggle', JSON.stringify(value));
	});
	imageProxyUrl.subscribe((value) => {
		console.log('[save image-proxy url]', value);
		storage.set('preference:image-proxy:url', JSON.stringify(value));
	});
	imageProxySalt.subscribe((value) => {
		console.log('[save image-proxy salt]', value);
		storage.set('preference:image-proxy:salt', JSON.stringify(value));
	});
	imageProxyKey.subscribe((value) => {
		console.log('[save image-proxy]', value);
		storage.set('preference:image-proxy:key', JSON.stringify(value));
	});
}

// Temporary
export const developerMode = writable(
	browser ? new WebStorage(localStorage).get('preference:developer-mode') === 'true' : false
);
