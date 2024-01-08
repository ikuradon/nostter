<script lang="ts">
	import { robohash, type Metadata } from '$lib/Items';
	import { nip19 } from 'nostr-tools';
	import { createImgProxyUrl } from '$lib/ImgProxy';

	export let metadata: Metadata;

	$: name = metadata.content?.display_name ?? '@' + metadata.content?.name;

	const onImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.src = createImgProxyUrl(robohash(metadata.event.pubkey), 128);
	};
</script>

<article>
	<a href="/{nip19.npubEncode(metadata.event.pubkey)}">
		<img
			src={createImgProxyUrl(metadata.picture, 128)}
			alt={name}
			title={name}
			on:error={onImageError}
		/>
	</a>
</article>

<style>
	a {
		display: block;
		width: 30px;
		height: 30px;
	}

	img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		object-fit: cover;
	}
</style>
