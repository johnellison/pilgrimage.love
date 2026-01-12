<script lang="ts">
	import { siteConfig } from '$lib/config/site';
	import VideoEmbed from '$lib/components/home/VideoEmbed.svelte';
	import DonationProgress from '$lib/components/home/DonationProgress.svelte';
	import PilgrimCards from '$lib/components/home/PilgrimCards.svelte';
	import EmailSignup from '$lib/components/home/EmailSignup.svelte';
	import { reveal, staggerReveal } from '$lib/actions/reveal';
	import { onMount } from 'svelte';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>{siteConfig.name} - {siteConfig.tagline}</title>
	<meta name="description" content={siteConfig.description} />
</svelte:head>

<!-- Hero Section - Premium Cinematic -->
<section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16 pb-24">
	<!-- Radial gradient background -->
	<div class="absolute inset-0 bg-gradient-radial from-muted/30 via-background to-background dark:from-muted/10"></div>

	<div class="container-custom relative z-10 py-16">
		<div class="mx-auto max-w-4xl text-center flex flex-col gap-6 items-center">
			<!-- Label -->
			<span class="label-uppercase text-primary opacity-80 reveal-fade" class:revealed={mounted}>
				A Sacred Documentary
			</span>

			<!-- Main Title -->
			<h1
				class="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground drop-shadow-lg leading-tight reveal"
				class:revealed={mounted}
			>
				The Pilgrimage
			</h1>

			<!-- Description -->
			<p
				class="text-lg md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed reveal"
				style="transition-delay: 100ms;"
				class:revealed={mounted}
			>
				A sacred journey into the heart of the Mahakumbh Mela, where millions of souls converge in search of redemption.
			</p>

			<!-- Video Trailer with Premium Glow -->
			<div
				class="mt-12 w-full max-w-4xl reveal-scale"
				style="transition-delay: 200ms;"
				class:revealed={mounted}
			>
				<VideoEmbed
					url={siteConfig.videos.trailer3min.url}
					title={siteConfig.videos.trailer3min.title}
				/>
			</div>

			<!-- CTA Buttons - Premium Style -->
			<div
				class="mt-12 flex flex-col sm:flex-row gap-4 w-full justify-center reveal"
				style="transition-delay: 300ms;"
				class:revealed={mounted}
			>
				<button
					class="inline-flex h-12 min-w-[180px] items-center justify-center bg-primary px-8 label-uppercase text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(250,204,97,0.3)] press-effect rounded"
				>
					Support the Film
				</button>
				<button
					class="inline-flex h-12 min-w-[180px] items-center justify-center border border-foreground/20 px-8 label-uppercase text-foreground transition-all hover:border-primary hover:text-primary hover:bg-primary/5 rounded"
				>
					Meet the Pilgrims
				</button>
			</div>
		</div>
	</div>
</section>

<!-- Spacer -->
<div class="h-20"></div>

<!-- Story Section - Premium Two Column -->
<section class="section-spacing dark:section-dark">
	<div class="container-custom">
		<div class="flex flex-col lg:flex-row gap-16 items-center">
			<!-- Portrait Image -->
			<div class="w-full lg:w-5/12">
				<div class="relative aspect-[3/4] w-full overflow-hidden shadow-2xl rounded">
					<div class="absolute inset-0 bg-cover bg-center flex items-center justify-center text-muted-foreground bg-muted">
						[Featured Portrait]
					</div>
					<!-- Decorative border -->
					<div class="absolute inset-4 border border-white/10 pointer-events-none"></div>
				</div>
			</div>

			<!-- Text Content -->
			<div class="w-full lg:w-7/12 flex flex-col gap-8">
				<div class="space-y-4">
					<span class="label-uppercase text-primary">The Story</span>
					<blockquote class="quote-large text-3xl md:text-4xl italic leading-tight text-foreground py-2">
						What you seek is seeking you.
					</blockquote>
					<p class="text-sm text-primary/70 pl-7 label-uppercase">— Rumi</p>
				</div>

				<div class="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
					<p>
						The Mahakumbh Mela is not just a festival; it is a cosmic event. Every twelve years, the alignment of the stars signals the time for humanity to wash away its sins.
					</p>
					<p>
						<span class="text-foreground font-normal">The Pilgrimage</span> follows four distinct individuals from different corners of the world, drawn by an inexplicable pull to the confluence of the sacred rivers.
					</p>
					<p>
						We move beyond the spectacle to find the silence within the chaos, capturing the intimate moments where the human spirit touches the divine.
					</p>
				</div>

				<div class="pt-4">
					<a class="inline-flex items-center gap-2 text-primary hover:text-white transition-colors group" href="#">
						<span class="border-b border-primary pb-0.5 label-uppercase">Read full synopsis</span>
						<svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Mission Section - Premium Grid -->
<section class="section-spacing dark:bg-background">
	<div class="container-custom">
		<div class="mb-12 flex flex-col items-start gap-2 accent-bar reveal" use:reveal>
			<h2 class="text-3xl font-bold text-foreground">Our Mission</h2>
			<p class="text-muted-foreground">Documenting the undocumented moments of faith.</p>
		</div>

		<!-- Three Mission Cards -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Card 1 -->
			<div class="group flex flex-col gap-4">
				<div class="aspect-square w-full overflow-hidden bg-card relative rounded">
					<div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-90 hover:opacity-100 flex items-center justify-center text-muted-foreground">
						[The Ritual]
					</div>
					<div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
				</div>
				<div>
					<h3 class="text-xl font-medium text-foreground group-hover:text-primary transition-colors">The Ritual</h3>
					<p class="mt-2 text-sm text-muted-foreground leading-relaxed">
						Capturing the ancient ceremonies that have been performed for thousands of years.
					</p>
				</div>
			</div>

			<!-- Card 2 -->
			<div class="group flex flex-col gap-4">
				<div class="aspect-square w-full overflow-hidden bg-card relative rounded">
					<div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-90 hover:opacity-100 flex items-center justify-center text-muted-foreground">
						[The Gathering]
					</div>
					<div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
				</div>
				<div>
					<h3 class="text-xl font-medium text-foreground group-hover:text-primary transition-colors">The Gathering</h3>
					<p class="mt-2 text-sm text-muted-foreground leading-relaxed">
						Witnessing the largest peaceful gathering of humanity on Earth.
					</p>
				</div>
			</div>

			<!-- Card 3 -->
			<div class="group flex flex-col gap-4">
				<div class="aspect-square w-full overflow-hidden bg-card relative rounded">
					<div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-90 hover:opacity-100 flex items-center justify-center text-muted-foreground">
						[The People]
					</div>
					<div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
				</div>
				<div>
					<h3 class="text-xl font-medium text-foreground group-hover:text-primary transition-colors">The People</h3>
					<p class="mt-2 text-sm text-muted-foreground leading-relaxed">
						Telling individual stories of the faithful who travel thousands of miles.
					</p>
				</div>
			</div>
		</div>

		<p class="text-center text-muted-foreground mt-16 max-w-4xl mx-auto italic reveal" use:reveal>
			Pilgrimage brings together Kogi Mamos of Colombia, Sadhu masters of India, Huni Kuin of the Amazon, Sufi of Tunisia, and other leaders in a shared planetary mission: to walk the path of peace across all traditions.
		</p>
	</div>
</section>

<!-- Featured Pilgrims -->
<section class="section-spacing">
	<div class="container-custom">
		<div class="text-center mb-20 reveal" use:reveal>
			<h2 class="text-4xl md:text-5xl font-bold mb-6">
				Meet the Pilgrims
			</h2>
			<p class="text-xl text-muted-foreground max-w-2xl mx-auto">
				27 extraordinary souls, one sacred journey
			</p>
		</div>

		<div class="stagger-children" use:staggerReveal>
			<PilgrimCards />
		</div>

		<div class="text-center mt-20 reveal" use:reveal>
			<a
				href="/pilgrims"
				class="inline-flex items-center justify-center gap-3 border-2 border-foreground bg-transparent px-10 py-4 text-base font-medium text-foreground hover:bg-foreground hover:text-background transition-all duration-300 group rounded"
			>
				View All Pilgrims
				<svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</div>
	</div>
</section>

<!-- Funding Section - Premium Support -->
<section class="section-spacing dark:section-darker">
	<div class="container-custom">
		<div class="mx-auto max-w-3xl text-center">
			<div class="reveal-scale" use:reveal>
				<span class="label-uppercase text-primary mb-6 block">Post-Production Fund</span>
				<h2 class="text-3xl md:text-5xl font-bold mb-8">
					Help us finish the story
				</h2>

				<p class="text-lg text-muted-foreground mb-12 leading-relaxed font-light">
					We recently received a transformative $6,000 donation from a generous supporter in the Shaktipat community. Now, we need your help for the final stretch to complete post-production, edit the footage, and bring this sacred journey to the world.
				</p>

				<!-- Progress Bar -->
				<div class="mb-12 reveal" use:reveal>
					<DonationProgress />
				</div>

				<div class="reveal" use:reveal>
					<button
						class="inline-flex items-center justify-center bg-primary px-10 py-4 label-uppercase text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/20 press-effect rounded-lg"
					>
						Donate & Join the Circle
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Email Signup Section -->
<section class="section-spacing">
	<div class="container-custom">
		<div class="mx-auto max-w-3xl text-center reveal" use:reveal>
			<h2 class="text-4xl md:text-5xl font-bold mb-6">
				Join the Movement
			</h2>
			<p class="subtitle-italic text-xl mb-12">
				Receive updates, teachings, and invitations to be part of this global call to life
			</p>
			<EmailSignup />
		</div>
	</div>
</section>
