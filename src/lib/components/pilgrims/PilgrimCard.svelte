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
	class="group block overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition-all duration-300"
>
	<div class="aspect-[3/4] overflow-hidden bg-sacred-earth-100">
		{#if !imageError}
			<img
				src={pilgrim.image}
				alt={pilgrim.name}
				class="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
				onerror={() => imageError = true}
				loading="lazy"
			/>
		{:else}
			<!-- Placeholder with initials if image fails -->
			<div class="h-full w-full flex items-center justify-center bg-gradient-to-br from-sacred-earth-200 to-ganges-blue-200">
				<div class="text-6xl font-serif font-bold text-sacred-earth-600">
					{pilgrim.name.split(' ').map(n => n[0]).join('')}
				</div>
			</div>
		{/if}
	</div>

	<div class="p-6 space-y-3">
		<div>
			<h3 class="text-xl font-serif font-bold text-foreground group-hover:text-saffron-600 transition-colors">
				{pilgrim.name}
			</h3>
			<p class="text-sm text-muted-foreground mt-1">
				{pilgrim.title}
			</p>
		</div>

		<p class="text-sm text-foreground/70 line-clamp-3">
			{pilgrim.shortBio}
		</p>

		<div class="pt-2">
			<span class="text-sm text-saffron-600 font-medium group-hover:underline">
				Read their story →
			</span>
		</div>
	</div>
</a>
