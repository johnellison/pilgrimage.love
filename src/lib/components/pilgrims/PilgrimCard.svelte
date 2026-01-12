<script lang="ts">
	interface Pilgrim {
		id: string;
		name: string;
		title: string;
		shortBio: string;
		image: string;
	}

	interface Props {
		pilgrim: Pilgrim;
	}

	let { pilgrim }: Props = $props();

	// Fallback image if image doesn't exist
	let imageError = $state(false);
</script>

<a
	href="/pilgrims#{pilgrim.id}"
	class="group relative aspect-[3/5] cursor-pointer overflow-hidden bg-card reveal-scale rounded-lg"
>
	<!-- Image Container -->
	<div class="absolute inset-0 overflow-hidden">
		{#if !imageError}
			<img
				src={pilgrim.image}
				alt={pilgrim.name}
				class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
				onerror={() => imageError = true}
				loading="lazy"
			/>
		{:else}
			<!-- Placeholder with initials if image fails -->
			<div class="h-full w-full flex items-center justify-center bg-gradient-to-br from-muted to-card">
				<div class="text-6xl font-serif font-bold text-muted-foreground">
					{pilgrim.name.split(' ').map(n => n[0]).join('')}
				</div>
			</div>
		{/if}
	</div>

	<!-- Gradient Overlay -->
	<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

	<!-- Content -->
	<div class="absolute bottom-0 left-0 w-full p-6">
		<p class="label-uppercase text-primary mb-1">
			{pilgrim.title}
		</p>
		<h3 class="text-2xl font-bold text-white">
			{pilgrim.name}
		</h3>
	</div>
</a>
