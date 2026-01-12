<script lang="ts">
	import { siteConfig } from '$lib/config/site';
	import VideoEmbed from '$lib/components/home/VideoEmbed.svelte';
	import DonationProgress from '$lib/components/home/DonationProgress.svelte';
	import PilgrimCards from '$lib/components/home/PilgrimCards.svelte';
	import EmailSignup from '$lib/components/home/EmailSignup.svelte';
</script>

<svelte:head>
	<title>{siteConfig.name} - {siteConfig.tagline}</title>
	<meta name="description" content={siteConfig.description} />
</svelte:head>

<div class="container-custom">
	<!-- Hero Section -->
	<section class="section-spacing">
		<div class="mx-auto max-w-4xl text-center">
			<h1 class="text-5xl font-serif font-bold tracking-tight text-foreground sm:text-7xl mb-6">
				{siteConfig.name}
			</h1>
			<h2 class="text-xl text-muted-foreground font-serif mb-8">
				{siteConfig.tagline}
			</h2>
			<p class="text-lg leading-8 text-foreground/80 mb-12">
				854 kilometers through India's Mahakumbh Mela<br />
				A documentary uniting humanity across faiths, cultures, and sacred traditions
			</p>

			<!-- Video Trailer -->
			<div class="mb-8">
				<VideoEmbed
					url={siteConfig.videos.trailer3min.url}
					title={siteConfig.videos.trailer3min.title}
				/>
			</div>

			<!-- CTA Buttons -->
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/donate"
					class="inline-flex items-center justify-center rounded-md bg-saffron-600 px-8 py-3 text-base font-medium text-white hover:bg-saffron-700 transition-colors"
				>
					Support the Film
				</a>
				<a
					href="/pilgrims"
					class="inline-flex items-center justify-center rounded-md border border-sacred-earth-300 bg-background px-8 py-3 text-base font-medium text-foreground hover:bg-sacred-earth-50 transition-colors"
				>
					Meet the Pilgrims
				</a>
			</div>
		</div>
	</section>

	<!-- The Story Section -->
	<section class="section-spacing bg-gradient-sacred rounded-2xl px-8 py-16">
		<div class="mx-auto max-w-3xl">
			<h2 class="text-3xl font-serif font-bold text-center mb-8">
				What is The Pilgrimage?
			</h2>
			<div class="space-y-6">
				<p class="text-foreground/80 leading-relaxed">
					Over 14 days in India, we followed 27 pilgrims from 15 countries—including an ex-Israeli soldier,
					an Amazon shaman, and an interfaith married couple—as they walked 854 kilometers through
					the Mahakumbh Mela, the largest gathering in human history with over 400 million people.
				</p>
				<p class="text-foreground/80 leading-relaxed">
					What began as a documentary evolved into a living prayer for the entire planet—a testament
					to our shared humanity that transcends borders, faiths, and conflicts.
				</p>
			</div>
		</div>
	</section>

	<!-- Featured Characters -->
	<section class="section-spacing">
		<div class="text-center mb-12">
			<h2 class="text-3xl font-serif font-bold text-foreground mb-4">
				Meet the Pilgrims
			</h2>
			<p class="text-lg text-muted-foreground">
				27 extraordinary souls, one sacred journey
			</p>
		</div>
		<PilgrimCards />
		<div class="text-center mt-12">
			<a
				href="/pilgrims"
				class="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-base font-medium text-foreground hover:bg-accent transition-colors"
			>
				View All Pilgrims →
			</a>
		</div>
	</section>

	<!-- Funding Section -->
	<section class="section-spacing text-center bg-sacred-earth-50 rounded-2xl py-16 px-8">
		<div class="mx-auto max-w-2xl">
			<h2 class="text-3xl font-serif font-bold mb-6">
				Why We Need Your Support
			</h2>

			<div class="mb-8">
				<DonationProgress />
			</div>

			<p class="text-lg text-foreground/80 mb-8">
				Help us complete post-production editing, conduct master interviews, and launch
				our community platform. 33% of all profits support the wisdom keepers featured in the film.
			</p>

			<a
				href="/donate"
				class="inline-flex items-center justify-center rounded-md bg-saffron-600 px-8 py-3 text-base font-medium text-white hover:bg-saffron-700 transition-colors"
			>
				Donate Now
			</a>
		</div>
	</section>

	<!-- Email Signup Section -->
	<section class="section-spacing">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-serif font-bold text-foreground mb-4">
				Join the Movement
			</h2>
			<p class="text-lg text-muted-foreground mb-8">
				Receive updates, teachings, and invitations to be part of this global call to life
			</p>
			<EmailSignup />
		</div>
	</section>
</div>
