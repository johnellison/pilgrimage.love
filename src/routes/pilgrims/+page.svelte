<script lang="ts">
	import { siteConfig } from '$lib/config/site';
	import PilgrimCard from '$lib/components/pilgrims/PilgrimCard.svelte';
</script>

<svelte:head>
	<title>The Pilgrims - {siteConfig.name}</title>
	<meta name="description" content="Meet the 27 extraordinary individuals who walked 854 kilometers through India's Mahakumbh Mela" />
</svelte:head>

<div class="container-custom section-spacing">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl font-serif font-bold tracking-tight text-foreground sm:text-6xl mb-6">
				The Pilgrims
			</h1>
			<p class="text-lg text-muted-foreground max-w-3xl mx-auto">
				Meet the extraordinary individuals who walked 854 kilometers through India's Mahakumbh Mela,
				each bringing their own story, struggles, and search for meaning
			</p>
		</div>

		<!-- Pilgrim Grid -->
		<div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 mb-16">
			{#each siteConfig.pilgrims as pilgrim}
				<PilgrimCard {pilgrim} />
			{/each}
		</div>

		<!-- Full Pilgrim Profiles -->
		<div class="space-y-16 max-w-4xl mx-auto">
			{#each siteConfig.pilgrims as pilgrim}
				<article id={pilgrim.id} class="scroll-mt-20">
					<div class="border-t border-border pt-12">
						<div class="grid md:grid-cols-3 gap-8">
							<!-- Image -->
							<div class="md:col-span-1">
								<div class="aspect-[3/4] overflow-hidden rounded-lg bg-sacred-earth-100">
									<img
										src={pilgrim.image}
										alt={pilgrim.name}
										class="h-full w-full object-cover object-center"
										onerror={(e) => {
											e.currentTarget.style.display = 'none';
											e.currentTarget.parentElement.innerHTML = `
												<div class="h-full w-full flex items-center justify-center bg-gradient-to-br from-sacred-earth-200 to-ganges-blue-200">
													<div class="text-6xl font-serif font-bold text-sacred-earth-600">
														${pilgrim.name.split(' ').map(n => n[0]).join('')}
													</div>
												</div>
											`;
										}}
										loading="lazy"
									/>
								</div>
							</div>

							<!-- Content -->
							<div class="md:col-span-2 space-y-4">
								<div>
									<h2 class="text-3xl font-serif font-bold text-foreground mb-2">
										{pilgrim.name}
									</h2>
									<p class="text-lg text-muted-foreground">
										{pilgrim.title}
									</p>
								</div>

								{#if pilgrim.quote}
									<blockquote class="border-l-4 border-saffron-500 pl-4 italic text-foreground/80">
										"{pilgrim.quote}"
									</blockquote>
								{/if}

								<div class="prose prose-lg max-w-none">
									<p class="text-foreground/80 leading-relaxed">
										{pilgrim.fullBio}
									</p>
								</div>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>

		<!-- CTA Section -->
		<div class="mt-16 text-center bg-gradient-sacred rounded-2xl py-12 px-8">
			<h2 class="text-2xl font-serif font-bold text-foreground mb-4">
				Support Their Stories
			</h2>
			<p class="text-foreground/80 mb-6 max-w-2xl mx-auto">
				Help us bring these powerful stories to the world and support the wisdom keepers
				who guide us toward unity and healing
			</p>
			<a
				href="/donate"
				class="inline-flex items-center justify-center rounded-md bg-saffron-600 px-8 py-3 text-base font-medium text-white hover:bg-saffron-700 transition-colors"
			>
				Donate Now
			</a>
		</div>
	</div>
</div>
