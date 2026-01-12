<script lang="ts">
	import { siteConfig } from '$lib/config/site';
	import PilgrimCard from '$lib/components/pilgrims/PilgrimCard.svelte';

	// Show first 4 pilgrims on home page
	const featuredPilgrims = siteConfig.pilgrims.slice(0, 4);
</script>

<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
	{#each featuredPilgrims as pilgrim, i}
		<div style="transition-delay: {i * 100}ms;">
			<PilgrimCard {pilgrim} />
		</div>
	{/each}
</div>
