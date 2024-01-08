<script lang="ts">
	import type { ChannelMetadata } from '$lib/Types';
	import {createImgProxyUrl} from '$lib/ImgProxy';

	export let channelMetadata: ChannelMetadata | undefined;
</script>

<div>
	<img src={createImgProxyUrl(channelMetadata?.picture)} alt="" />
	<span>{channelMetadata?.name ?? ''}</span>
</div>

<style>
	div {
		display: flex;
		align-items: center;
	}

	img {
		width: 3rem;
		height: 3rem;
		object-fit: cover;
	}

	span {
		font-size: 1.5rem;
		margin-left: 1rem;
	}
</style>
