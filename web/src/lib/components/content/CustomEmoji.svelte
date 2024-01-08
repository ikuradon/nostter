<script lang="ts">
	import {createImgProxyUrl} from '$lib/ImgProxy';

	export let text: string = '';
	export let url: string;
</script>

<img src={createImgProxyUrl(url, 128)} alt={text} title={text} />

<style>
	img {
		max-height: 1.5em;
		vertical-align: top;
	}
</style>
