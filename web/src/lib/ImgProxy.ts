import * as utils from '@noble/curves/abstract/utils';
import { hmac } from '@noble/hashes/hmac';
import { sha256 } from '@noble/hashes/sha256';
import { base64 } from '@scure/base';

import { get } from 'svelte/store';
import { imageProxy, imageProxyUrl, imageProxyKey, imageProxySalt } from './stores/Preference';

const hmacSha256 = (key: Uint8Array, ...messages: Uint8Array[]) => {
	return hmac(sha256, key, utils.concatBytes(...messages));
};

export const createImgProxyUrl = (url: string | undefined, resize?: number): string => {
	if (typeof url === 'undefined') return '';

	const textEncoder = new TextEncoder();

	function urlSafe(s: string) {
		return s.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
	}

	function signUrl(url: string) {
		const result = hmacSha256(
			utils.hexToBytes(get(imageProxyKey)),
			utils.hexToBytes(get(imageProxySalt)),
			textEncoder.encode(url)
		);
		return urlSafe(base64.encode(result));
	}

	if (!get(imageProxy)) return url;

	if (url.startsWith('data:') || url.startsWith('blob:')) return url;
	const opt = resize
		? `rs:fit:${resize}:${resize}/dpr:${window.devicePixelRatio}`
		: `rs:fit:1000:1000/dpr:${window.devicePixelRatio}`;
	const urlBytes = textEncoder.encode(url);
	const urlEncoded = urlSafe(base64.encode(urlBytes));
	const path = `/${opt}/${urlEncoded}`;
	const sig = signUrl(path);
	return `${new URL(get(imageProxyUrl)).toString()}${sig}${path}`;
};
