<script lang="ts">
	import { siteConfig } from '$lib/config/site';
	import EmailSignup from '$lib/components/home/EmailSignup.svelte';
	import { reveal, staggerReveal } from '$lib/actions/reveal';
	import { onMount } from 'svelte';

	let mounted = $state(false);
	let countersTriggered = $state(false);
	let numbersSection: HTMLElement;

	const stats = [
		{ value: 14, label: 'Days' },
		{ value: 854, label: 'Kilometres' },
		{ value: 27, label: 'Pilgrims · 15 Countries' }
	];

	let counts = $state([0, 0, 0]);

	function runCountUp() {
		if (countersTriggered) return;
		countersTriggered = true;
		stats.forEach((stat, i) => {
			const duration = 1400;
			const start = performance.now();
			function step(now: number) {
				const elapsed = now - start;
				const progress = Math.min(elapsed / duration, 1);
				const eased = 1 - Math.pow(1 - progress, 3);
				counts[i] = Math.round(eased * stat.value);
				if (progress < 1) requestAnimationFrame(step);
				else counts[i] = stat.value;
			}
			requestAnimationFrame(step);
		});
	}

	onMount(() => {
		mounted = true;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) runCountUp();
			},
			{ threshold: 0.3 }
		);
		if (numbersSection) observer.observe(numbersSection);
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>{siteConfig.name} — {siteConfig.tagline}</title>
	<meta name="description" content={siteConfig.description} />
</svelte:head>

<!-- ============================================================
     SECTION 1: HERO
     ============================================================ -->
<section
	class="relative min-h-screen flex items-center justify-center overflow-hidden"
	style="background: #1E1E1E;"
>
	<div
		class="hero-bg"
		style="background-image: url('/images/hero.jpg'); filter: brightness(0.38) sepia(0.1);"
	></div>
	<div class="hero-vignette"></div>

	<div class="hero-content w-full text-center px-8" style="max-width: 1100px; margin: 0 auto;">
		<div
			class="deck-label reveal-fade"
			class:revealed={mounted}
			style="text-align: center; margin-bottom: 24px;"
		>
			A Sacred Documentary
		</div>

		<h1
			class="reveal"
			class:revealed={mounted}
			style="
				font-family: 'Noto Serif', Georgia, serif;
				font-size: clamp(44px, 11vw, 140px);
				font-weight: 700;
				letter-spacing: 0.06em;
				line-height: 1.0;
				color: #F5F3EC;
				margin-bottom: 24px;
			"
		>
			PILGRIMAGE
		</h1>

		<p
			class="reveal"
			class:revealed={mounted}
			style="
				font-family: 'Noto Serif', Georgia, serif;
				font-style: italic;
				font-weight: 400;
				font-size: clamp(20px, 2.2vw, 32px);
				color: #FACC61;
				margin-bottom: 56px;
				transition-delay: 100ms;
			"
		>
			{siteConfig.tagline}
		</p>

		<div
			class="reveal flex flex-col sm:flex-row gap-4 justify-center"
			class:revealed={mounted}
			style="transition-delay: 220ms;"
		>
			<a
				href={siteConfig.videos.trailer.url}
				target="_blank"
				rel="noopener noreferrer"
				style="
					display: inline-flex;
					align-items: center;
					justify-content: center;
					height: 48px;
					padding: 0 32px;
					border: 1px solid rgba(245, 243, 236, 0.3);
					font-family: 'Noto Sans', sans-serif;
					font-size: 11px;
					font-weight: 700;
					letter-spacing: 0.2em;
					text-transform: uppercase;
					color: #F5F3EC;
					transition: border-color 0.3s ease, color 0.3s ease;
					text-decoration: none;
				"
				onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,204,97,0.5)'; (e.currentTarget as HTMLElement).style.color = '#FACC61'; }}
				onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,243,236,0.3)'; (e.currentTarget as HTMLElement).style.color = '#F5F3EC'; }}
			>
				Watch the Trailer
			</a>
			<a
				href="/donate"
				style="
					display: inline-flex;
					align-items: center;
					justify-content: center;
					height: 48px;
					padding: 0 32px;
					background: #FACC61;
					font-family: 'Noto Sans', sans-serif;
					font-size: 11px;
					font-weight: 700;
					letter-spacing: 0.2em;
					text-transform: uppercase;
					color: #1E1E1E;
					transition: background 0.3s ease;
					text-decoration: none;
				"
				onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f5c040'; }}
				onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = '#FACC61'; }}
			>
				Support the Film →
			</a>
		</div>
	</div>
</section>

<!-- ============================================================
     SECTION 2: OPENING QUESTION
     ============================================================ -->
<section class="relative py-32 overflow-hidden" style="background: #1E1E1E;">
	<div
		class="hero-bg"
		style="background-image: url('/images/ganga-aarti.jpeg'); filter: brightness(0.3) sepia(0.15);"
	></div>
	<div class="hero-vignette"></div>

	<div class="hero-content container-custom">
		<div class="max-w-4xl mx-auto text-center" use:reveal>
			<span class="deck-label" style="text-align: center;">Opening</span>

			<blockquote
				style="
					position: relative;
					padding-left: 56px;
					font-family: 'Noto Serif', Georgia, serif;
					font-style: italic;
					font-weight: 400;
					font-size: clamp(24px, 3vw, 40px);
					line-height: 1.45;
					color: #F5F3EC;
					text-align: left;
					margin-bottom: 24px;
				"
			>
				<span
					style="
						position: absolute;
						left: 0;
						top: -18px;
						font-size: 96px;
						line-height: 1;
						color: rgba(250,204,97,0.4);
						font-style: normal;
					">"</span>
				What is the one thing that could bring people like us — so different, from so far — together?
			</blockquote>

			<p
				style="
					font-family: 'Noto Sans', sans-serif;
					font-size: 12px;
					color: #8A867C;
					letter-spacing: 0.15em;
					text-transform: uppercase;
					margin-bottom: 40px;
					padding-left: 56px;
					text-align: left;
				"
			>
				— GABI · PILGRIM · BALI · MAY 2026
			</p>

			<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 16px;">
				{#each siteConfig.pilgrimPills as pill}
					<span class="pilgrim-pill">{pill}</span>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ============================================================
     SECTION 3: THE NUMBERS
     ============================================================ -->
<section class="py-24" style="background: #181818;" bind:this={numbersSection}>
	<div class="container-custom">
		<div use:reveal>
			<span class="deck-label">A Pilgrimage</span>
			<h2 style="margin-bottom: 48px; color: #F5F3EC; max-width: 760px;">
				From across five continents<br>to the largest gathering in history.
			</h2>
		</div>

		<div
			style="display: flex; justify-content: space-around; align-items: flex-start; gap: 40px; flex-wrap: wrap; margin-bottom: 48px;"
			use:staggerReveal
		>
			{#each stats as stat, i}
				<div style="text-align: center; flex: 1; min-width: 180px;">
					<div
						style="
							font-family: 'Noto Serif', Georgia, serif;
							font-size: clamp(72px, 10vw, 140px);
							font-weight: 700;
							line-height: 1;
							color: #FACC61;
							letter-spacing: -0.01em;
						"
					>{counts[i]}</div>
					<div
						style="
							margin-top: 12px;
							font-family: 'Noto Sans', sans-serif;
							font-size: 12px;
							font-weight: 700;
							letter-spacing: 0.2em;
							text-transform: uppercase;
							color: #8A867C;
						"
					>{stat.label}</div>
				</div>
			{/each}
		</div>

		<p
			style="
				border-left: 2px solid rgba(250,204,97,0.25);
				padding-left: 28px;
				max-width: 860px;
				color: #C9C5B8;
				font-size: clamp(16px, 1.4vw, 19px);
				line-height: 1.75;
				font-weight: 300;
			"
			use:reveal
		>
			In February 2025, twenty-seven pilgrims journeyed through India together — guided by
			<em style="font-style:italic; color:#F5F3EC;">Guru Swami Nardanand</em> — to the Mahakumbh Mela,
			the largest gathering in the history of our species.
		</p>
	</div>
</section>

<!-- ============================================================
     SECTION 4: THE THESIS
     ============================================================ -->
<section class="relative py-40 overflow-hidden" style="background: #1E1E1E;">
	<div
		class="hero-bg"
		style="background-image: url('/images/guru-ji-eyes.jpg'); filter: brightness(0.22) sepia(0.1);"
	></div>
	<div class="hero-vignette"></div>

	<div class="hero-content container-custom" use:reveal>
		<div style="max-width: 1100px; margin: 0 auto; text-align: center;">
			<span class="deck-label" style="text-align:center;">The Thesis</span>

			<div
				style="
					font-family: 'Noto Serif', Georgia, serif;
					font-weight: 700;
					line-height: 1.05;
					font-size: clamp(52px, 7vw, 100px);
					color: #F5F3EC;
					margin-bottom: 36px;
				"
			>
				<span style="color: #FACC61;">Love is the force that unites all.</span>
			</div>

			<p
				style="
					max-width: 660px;
					margin: 0 auto;
					font-size: clamp(16px, 1.3vw, 20px);
					line-height: 1.75;
					color: #C9C5B8;
					font-weight: 300;
				"
			>
				Not romance. Not sentiment — the force that crosses tradition, nationality, and
				background. The thing twenty-seven of us walked 854 kilometres to remember.
			</p>
		</div>
	</div>
</section>

<!-- ============================================================
     SECTION 5: WHERE WE ARE
     ============================================================ -->
<section class="relative py-28 overflow-hidden" style="background: #1E1E1E;">
	<div
		class="hero-bg"
		style="background-image: url('/images/siri-gabi.jpeg'); filter: brightness(0.28) sepia(0.1);"
	></div>
	<div class="hero-vignette"></div>

	<div class="hero-content container-custom" use:reveal>
		<span class="deck-label">Where We Are</span>
		<h2 style="margin-bottom: 40px; color: #F5F3EC;">Final stages of post-production.</h2>

		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-bottom: 40px;">
			{#each [
				{ title: 'Filmed', items: ['14 days in India', "Guru Ji's teachings", 'Fire rituals · Mahakumbh', '27 pilgrims · 5 continents', '6K + 16mm analog'] },
				{ title: 'In the Edit', items: ['1-hour rough cut complete', '3 weeks editing with Fede', 'Additional IVs in Varese', 'Editorial thesis crystallising', 'Massi directing in Italy'] },
				{ title: 'Still to Come', items: ['Final edit week', 'Color & sound finish', 'Original score', 'Master interviews', 'Festival & community release'] }
			] as card}
				<div
					style="
						background: rgba(37, 37, 37, 0.88);
						border: 1px solid rgba(255,255,255,0.08);
						border-radius: 4px;
						padding: 28px;
					"
				>
					<h3
						style="
							font-family: 'Noto Sans', sans-serif;
							font-size: 12px;
							font-weight: 700;
							letter-spacing: 0.15em;
							text-transform: uppercase;
							color: #FACC61;
							margin-bottom: 16px;
						"
					>{card.title}</h3>
					<ul style="list-style: none; padding: 0;">
						{#each card.items as item}
							<li
								style="
									padding: 7px 0;
									border-bottom: 1px solid rgba(255,255,255,0.08);
									font-size: 14px;
									color: #C9C5B8;
									font-weight: 300;
								"
							>{item}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<p style="color: #FACC61; font-style: italic; font-size: 18px; text-align: center;">
			We are asking for the final stretch.
		</p>
	</div>
</section>

<!-- ============================================================
     SECTION 6: THE TEAM
     ============================================================ -->
<section class="py-24" style="background: #181818;">
	<div class="container-custom">
		<div use:reveal>
			<span class="deck-label">The Team</span>
			<h2 style="margin-bottom: 48px; color: #F5F3EC;">Walking together.</h2>
		</div>

		<div
			style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin-bottom: 40px;"
			use:staggerReveal
		>
			{#each siteConfig.pilgrims as pilgrim}
				<div style="text-align: center;">
					<div class="team-portrait-circle">
						<img src={pilgrim.image} alt={pilgrim.name} />
					</div>
					<div
						style="
							font-family: 'Noto Serif', Georgia, serif;
							font-size: 14px;
							font-weight: 600;
							color: #F5F3EC;
							line-height: 1.3;
							margin-bottom: 4px;
						"
					>{pilgrim.name}</div>
					<div
						style="
							font-family: 'Noto Sans', sans-serif;
							font-size: 11px;
							color: #8A867C;
							letter-spacing: 0.05em;
						"
					>{pilgrim.role}</div>
				</div>
			{/each}
		</div>

		<p style="text-align: center; color: #8A867C; font-size: 14px; font-style: italic;" use:reveal>
			With Federico (edit) · Stefano (Director of Photography) · and twenty-seven pilgrims from fifteen countries.
		</p>
	</div>
</section>

<!-- ============================================================
     SECTION 7: THE ASK (Financial Transparency)
     ============================================================ -->
<section class="py-24" style="background: #1E1E1E;">
	<div class="container-custom" use:reveal>
		<span class="deck-label">The Numbers</span>

		<div
			style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-top: 8px;"
			class="financial-grid"
		>
			<!-- Left: Raised & Invested -->
			<div style="padding-right: 48px;">
				<div
					style="
						font-family: 'Noto Sans', sans-serif;
						font-size: 10px;
						font-weight: 700;
						letter-spacing: 0.2em;
						text-transform: uppercase;
						color: #6DC98A;
						margin-bottom: 18px;
					"
				>✓ Raised to Date</div>

				<table style="width: 100%; border-collapse: collapse; font-family: 'Noto Sans', sans-serif; margin-bottom: 24px;">
					<tbody>
					{#each siteConfig.raisedFrom as row}
						<tr>
							<td style="padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 13px; color: #C9C5B8;">{row.label} <span style="color:#8A867C;">({row.sublabel})</span></td>
							<td style="padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.08); text-align: right; font-family: 'Noto Serif', Georgia, serif; font-weight: 600; color: #F5F3EC; font-size: 14px;">${row.amount.toLocaleString()}</td>
						</tr>
					{/each}
					<tr>
						<td style="padding: 12px 0 8px; font-size: 14px; font-weight: 700; color: #6DC98A;">✓ Total raised</td>
						<td style="padding: 12px 0 8px; text-align: right; font-family: 'Noto Serif', Georgia, serif; font-weight: 700; color: #6DC98A; font-size: 22px;">$45,570</td>
					</tr>
					</tbody>
				</table>

				<div style="border-top: 1px solid rgba(255,255,255,0.08); margin-bottom: 16px;"></div>
				<div style="font-family: 'Noto Sans', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #8A867C; margin-bottom: 12px;">Where It Went</div>

				<table style="width: 100%; border-collapse: collapse; font-family: 'Noto Sans', sans-serif;">
					<tbody>
					{#each siteConfig.invested as row}
						<tr>
							<td style="padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 13px; color: #C9C5B8;">{row.label}</td>
							<td style="padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,0.08); text-align: right; font-family: 'Noto Serif', Georgia, serif; font-weight: 500; color: #F5F3EC; font-size: 13px;">${row.amount.toLocaleString()}</td>
						</tr>
					{/each}
					<tr>
						<td style="padding: 12px 0 0; font-size: 14px; font-weight: 700; color: #6DC98A;">✓ Total invested</td>
						<td style="padding: 12px 0 0; text-align: right; font-family: 'Noto Serif', Georgia, serif; font-weight: 700; color: #6DC98A; font-size: 18px;">$45,570</td>
					</tr>
					</tbody>
				</table>
			</div>

			<!-- Right: The Ask -->
			<div style="border-left: 1px solid rgba(250,204,97,0.25); padding-left: 48px;">
				<div style="font-family: 'Noto Sans', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #FACC61; margin-bottom: 18px;">The Ask — To Finish the Film</div>

				<table style="width: 100%; border-collapse: collapse; font-family: 'Noto Sans', sans-serif; margin-bottom: 20px;">
					<tbody>
					{#each siteConfig.askItems as row}
						<tr>
							<td style="padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 13px; color: #C9C5B8;">{row.label}</td>
							<td style="padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.08); text-align: right; font-family: 'Noto Serif', Georgia, serif; font-weight: 600; color: #F5F3EC; font-size: 14px;">${row.amount.toLocaleString()}</td>
						</tr>
					{/each}
					<tr>
						<td style="padding: 16px 0 6px; font-size: 13px; color: #8A867C;">Total needed</td>
						<td style="padding: 16px 0 6px; text-align: right; font-family: 'Noto Serif', Georgia, serif; color: #8A867C; font-size: 14px;">$16,000</td>
					</tr>
					<tr>
						<td style="padding: 6px 0; font-size: 13px; color: #6DC98A;">✓ Secured (Chuffed community)</td>
						<td style="padding: 6px 0; text-align: right; font-family: 'Noto Serif', Georgia, serif; color: #6DC98A; font-size: 14px;">−$2,253</td>
					</tr>
					<tr>
						<td style="padding: 10px 0 12px; font-size: 17px; font-weight: 700; color: #FACC61; letter-spacing: -0.01em;">Still needed</td>
						<td style="padding: 10px 0 12px; text-align: right; font-family: 'Noto Serif', Georgia, serif; font-weight: 700; color: #FACC61; font-size: 28px; letter-spacing: -0.02em;">$13,747</td>
					</tr>
					</tbody>
				</table>

				<div style="border-top: 1px solid rgba(255,255,255,0.08); margin-bottom: 14px;"></div>
				<div style="font-family: 'Noto Sans', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #8A867C; margin-bottom: 12px;">Stretch — Ambitious Finish</div>

				<table style="width: 100%; border-collapse: collapse; font-family: 'Noto Sans', sans-serif;">
					<tbody>
					{#each siteConfig.stretchItems as row}
						<tr>
							<td style="padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #8A867C;">+ {row.label}</td>
							<td style="padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.08); text-align: right; font-family: 'Noto Serif', Georgia, serif; font-weight: 500; color: #8A867C; font-size: 12px;">${row.amount.toLocaleString()}</td>
						</tr>
					{/each}
					<tr>
						<td style="padding: 10px 0 0; font-size: 13px; font-weight: 600; color: #8A867C;">Ambitious finish</td>
						<td style="padding: 10px 0 0; text-align: right; font-family: 'Noto Serif', Georgia, serif; font-weight: 600; color: #8A867C; font-size: 15px;">$35,000</td>
					</tr>
					</tbody>
				</table>

				<div style="margin-top: 32px;">
					<a
						href="/donate"
						style="
							display: inline-flex;
							align-items: center;
							justify-content: center;
							width: 100%;
							height: 48px;
							background: #FACC61;
							font-family: 'Noto Sans', sans-serif;
							font-size: 11px;
							font-weight: 700;
							letter-spacing: 0.2em;
							text-transform: uppercase;
							color: #1E1E1E;
							text-decoration: none;
							transition: background 0.3s ease;
						"
						onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f5c040'; }}
						onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = '#FACC61'; }}
					>Support the Film →</a>
				</div>
			</div>
		</div>

		<p
			style="
				margin-top: 24px;
				text-align: center;
				font-family: 'Noto Sans', sans-serif;
				font-size: 11px;
				letter-spacing: 0.12em;
				text-transform: uppercase;
				color: #8A867C;
			"
		>
			Fiscally sponsored in the United States by The Fountain · DAF recommendations welcome
		</p>
	</div>
</section>

<!-- ============================================================
     SECTION 8: EMAIL SIGNUP
     ============================================================ -->
<section class="py-24" style="background: #151515;">
	<div class="container-custom">
		<div class="mx-auto max-w-2xl text-center" use:reveal>
			<span class="deck-label" style="text-align:center;">Stay Connected</span>
			<h2 style="margin-bottom: 16px; font-size: clamp(28px, 3.5vw, 48px); color: #F5F3EC;">
				Join the movement.
			</h2>
			<p class="subtitle-italic" style="margin-bottom: 40px; font-size: 18px;">
				Receive updates, teachings, and invitations to be part of this global call to life.
			</p>
			<EmailSignup />
		</div>
	</div>
</section>

<style>
	@media (max-width: 768px) {
		.financial-grid {
			grid-template-columns: 1fr !important;
		}
		.financial-grid > div:last-child {
			border-left: none !important;
			border-top: 1px solid rgba(250,204,97,0.25);
			padding-left: 0 !important;
			padding-top: 32px !important;
			margin-top: 32px;
		}
		.financial-grid > div:first-child {
			padding-right: 0 !important;
		}
	}
</style>
