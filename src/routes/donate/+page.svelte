<script lang="ts">
	import { siteConfig } from '$lib/config/site';
	import DonationProgress from '$lib/components/home/DonationProgress.svelte';
	import DonationForm from '$lib/components/donate/DonationForm.svelte';
	import CryptoWidget from '$lib/components/donate/CryptoWidget.svelte';
</script>

<svelte:head>
	<title>Donate - {siteConfig.name}</title>
	<meta name="description" content="Support The Pilgrimage documentary. Help us complete post-production and launch our community platform." />
</svelte:head>

<div class="container-custom section-spacing">
	<div class="max-w-4xl mx-auto">
		<h1 class="text-4xl font-serif font-bold tracking-tight text-foreground sm:text-6xl mb-6 text-center">
			Support The Pilgrimage
		</h1>
		<p class="text-lg text-center text-muted-foreground mb-12">
			Your contribution helps us complete this call to life
		</p>

		<!-- Funding Progress -->
		<div class="mb-12 bg-sacred-earth-50 rounded-lg p-8">
			<DonationProgress />
		</div>

		<!-- What We're Funding -->
		<section class="mb-12">
			<h2 class="text-2xl font-serif font-bold mb-6 text-center">What Your Support Enables</h2>
			<div class="space-y-4 max-w-2xl mx-auto">
				<div class="flex gap-4 items-start">
					<div class="flex-shrink-0 w-8 h-8 rounded-full bg-saffron-100 flex items-center justify-center text-saffron-700 font-bold">
						1
					</div>
					<div>
						<h3 class="font-semibold mb-1">Complete Post-Production</h3>
						<p class="text-sm text-muted-foreground">Final editing, color grading, sound mix, and scoring</p>
					</div>
				</div>
				<div class="flex gap-4 items-start">
					<div class="flex-shrink-0 w-8 h-8 rounded-full bg-saffron-100 flex items-center justify-center text-saffron-700 font-bold">
						2
					</div>
					<div>
						<h3 class="font-semibold mb-1">Master Interviews</h3>
						<p class="text-sm text-muted-foreground">In-depth reflection interviews with key pilgrims</p>
					</div>
				</div>
				<div class="flex gap-4 items-start">
					<div class="flex-shrink-0 w-8 h-8 rounded-full bg-saffron-100 flex items-center justify-center text-saffron-700 font-bold">
						3
					</div>
					<div>
						<h3 class="font-semibold mb-1">Community Platform</h3>
						<p class="text-sm text-muted-foreground">Launch online platform for teachings, screenings, and connection</p>
					</div>
				</div>
			</div>
		</section>

		<div class="grid md:grid-cols-2 gap-8 mb-12">
			<!-- Card/Stripe Donation -->
			<div class="space-y-6">
				<div class="text-center">
					<h2 class="text-2xl font-serif font-bold mb-2">Credit Card</h2>
					<p class="text-sm text-muted-foreground">Secure payment via Stripe</p>
				</div>
				<div class="bg-card border border-border rounded-lg p-6">
					<DonationForm />
				</div>
			</div>

			<!-- Crypto Donations -->
			<div class="space-y-6">
				<div class="text-center">
					<h2 class="text-2xl font-serif font-bold mb-2">Cryptocurrency</h2>
					<p class="text-sm text-muted-foreground">Send crypto directly</p>
				</div>
				<div class="space-y-4">
					<CryptoWidget type="eth" />
					<CryptoWidget type="btc" />
				</div>
			</div>
		</div>

		<!-- Alternative Option -->
		<section class="bg-gradient-sacred rounded-lg p-8 text-center mb-12">
			<h3 class="text-lg font-semibold mb-2">Alternative Platform</h3>
			<p class="text-sm text-muted-foreground mb-4">
				You can also support us on Chuffed
			</p>
			<a
				href={siteConfig.fundraising.chuffedUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center rounded-md bg-saffron-600 px-6 py-3 text-base font-medium text-white hover:bg-saffron-700 transition-colors"
			>
				Donate on Chuffed →
			</a>
		</section>

		<!-- Impact Statement -->
		<section class="text-center border-t border-border pt-8">
			<p class="text-lg text-foreground/70 italic">
				33% of all profits support the wisdom keepers and indigenous communities featured in this film
			</p>
		</section>
	</div>
</div>
