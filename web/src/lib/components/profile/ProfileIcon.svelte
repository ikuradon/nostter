<script lang="ts">
	import { createImgProxyUrl } from '$lib/ImgProxy';
	import { robohash, type Metadata } from '$lib/Items';

	export let metadata: Metadata;
	export let width = '100%';
	export let height = '100%';
</script>

<img
	src={createImgProxyUrl(metadata.picture ?? robohash(metadata.event.pubkey), 128)}
	alt=""
	style="width: {width}; height: {height};"
/>

<style>
	img {
		border-radius: 50%;
		object-fit: cover;
		vertical-align: text-bottom;
	}
</style>
