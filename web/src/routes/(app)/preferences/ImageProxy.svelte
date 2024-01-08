<script lang="ts">
	import { imageProxy } from '$lib/stores/Preference';
</script>

<h4>Image Proxy</h4>

<label>
	<input type="checkbox" bind:checked={$imageProxy} />
	<span>Compress image with imgproxy</span>
</label>
{#if $imageProxy}
	<div>Proxy enabled, but no further settings are available at this time.</div>
{/if}
