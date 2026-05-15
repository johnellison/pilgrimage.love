<script lang="ts">
	import { siteConfig } from '$lib/config/site';
	import DonationForm from '$lib/components/donate/DonationForm.svelte';
	import { reveal } from '$lib/actions/reveal';
</script>

<svelte:head>
	<title>Support — {siteConfig.name}</title>
	<meta
		name="description"
		content="Help us finish Pilgrimage — Ganga's Grace. $16,000 to complete post-production. Fiscally sponsored by The Fountain (501c3)."
	/>
</svelte:head>

<!-- Hero -->
<section class="relative py-32 overflow-hidden" style="background: #1E1E1E;">
	<div
		class="hero-bg"
		style="background-image: url('/images/kids-love.jpg'); filter: brightness(0.25) sepia(0.1);"
	></div>
	<div class="hero-vignette"></div>

	<div class="hero-content container-custom text-center" use:reveal>
		<span class="deck-label" style="text-align:center;">Walk With Us</span>
		<h1
			style="
				font-family: 'Noto Serif', Georgia, serif;
				font-size: clamp(40px, 6vw, 80px);
				font-weight: 700;
				letter-spacing: -0.01em;
				line-height: 1.05;
				color: #F5F3EC;
				margin-bottom: 20px;
			"
		>
			Some things can only be<br /><span style="color:#FACC61;">made together.</span>
		</h1>
		<p
			style="
				font-family: 'Noto Serif', Georgia, serif;
				font-style: italic;
				font-size: clamp(16px, 1.6vw, 22px);
				color: #C9C5B8;
				max-width: 680px;
				margin: 0 auto;
				line-height: 1.75;
			"
		>
			Finish this film. Seed what comes next.
		</p>
	</div>
</section>

<!-- Financial Transparency -->
<section class="py-20" style="background: #181818;">
	<div class="container-custom" use:reveal>
		<span class="deck-label">The Numbers</span>

		<div
			style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-top: 8px;"
			class="donate-grid"
		>
			<!-- Left: Already raised -->
			<div style="padding-right: 40px;">
				<div style="font-family:'Noto Sans',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:#6DC98A; margin-bottom:14px;">✓ Raised & Invested</div>
				<p style="font-size:13px; color:#C9C5B8; line-height:1.7; font-weight:300; margin-bottom:12px;">
					$45,570 raised from John Ellison and the Swami Ogi Foundation — fully invested in production: crew, travel, equipment, permits, and the rough cut edit with Fede.
				</p>
				<div style="font-family:'Noto Serif',Georgia,serif; font-size:28px; font-weight:700; color:#6DC98A;">$45,570</div>
				<div style="font-family:'Noto Sans',sans-serif; font-size:11px; color:#8A867C; letter-spacing:0.1em; text-transform:uppercase; margin-top:4px;">raised &amp; invested in production</div>
			</div>

			<!-- Right: The ask -->
			<div style="border-left:1px solid rgba(250,204,97,0.25); padding-left:40px;">
				<div style="font-family:'Noto Sans',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:#FACC61; margin-bottom:14px;">The Ask — To Finish the Film</div>
				<p style="font-size:13px; color:#C9C5B8; line-height:1.7; font-weight:300; margin-bottom:12px;">
					Final edit, colour &amp; sound, additional interview filming, Massi's direction and production, and an original score.
				</p>
				<div style="font-family:'Noto Serif',Georgia,serif; font-size:36px; font-weight:700; color:#FACC61; letter-spacing:-0.02em;">$16,000</div>
				<div style="font-family:'Noto Sans',sans-serif; font-size:11px; color:#8A867C; letter-spacing:0.1em; text-transform:uppercase; margin-top:4px;">to finish the film</div>
			</div>
		</div>
	</div>
</section>

<!-- Donation Form -->
<section class="py-20" style="background: #1E1E1E;">
	<div class="container-custom">
		<div style="max-width: 740px; margin: 0 auto;" use:reveal>
			<span class="deck-label">Ways In</span>
			<h2 style="margin-bottom: 40px; color: #F5F3EC; font-size: clamp(28px,3.5vw,48px);">
				Walk with us.
			</h2>
			<DonationForm />
		</div>
	</div>
</section>

<!-- DAF Instructions -->
<section class="py-16" style="background: #181818;">
	<div class="container-custom">
		<div
			style="
				max-width: 740px;
				margin: 0 auto;
				border: 1px solid rgba(250,204,97,0.18);
				border-radius: 4px;
				padding: 32px 36px;
			"
			use:reveal
		>
			<div style="font-family:'Noto Sans',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:#FACC61; margin-bottom:14px;">DAF Recommendations</div>
			<p style="font-size:15px; color:#C9C5B8; line-height:1.8; font-weight:300; margin-bottom:16px;">
				Pilgrimage is fiscally sponsored in the United States by <strong style="color:#F5F3EC; font-weight:600;">The Fountain</strong>, a 501(c)(3) non-profit organisation. Gifts recommended through your Donor-Advised Fund are fully tax-deductible.
			</p>
			<p style="font-size:15px; color:#C9C5B8; line-height:1.8; font-weight:300;">
				To receive our EIN, Letter of Determination, and wiring instructions, contact
				<a
					href="mailto:{siteConfig.contact.john}"
					style="color:#FACC61; text-decoration:none; border-bottom:1px solid rgba(250,204,97,0.3);"
				>{siteConfig.contact.john}</a>.
			</p>
		</div>
	</div>
</section>

<!-- Tax note -->
<section class="py-10" style="background: #1E1E1E;">
	<div class="container-custom text-center">
		<p style="font-family:'Noto Sans',sans-serif; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:#8A867C;">
			All gifts are tax-deductible where applicable · Secure payment via Stripe
		</p>
	</div>
</section>

<style>
	@media (max-width: 640px) {
		.donate-grid {
			grid-template-columns: 1fr !important;
		}
		.donate-grid > div:last-child {
			border-left: none !important;
			border-top: 1px solid rgba(250,204,97,0.25);
			padding-left: 0 !important;
			padding-top: 28px !important;
			margin-top: 24px;
		}
		.donate-grid > div:first-child {
			padding-right: 0 !important;
		}
	}
</style>
