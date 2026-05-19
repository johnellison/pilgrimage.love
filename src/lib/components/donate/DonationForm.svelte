<script lang="ts">
	import { siteConfig } from '$lib/config/site';
	import { toast } from 'svelte-sonner';

	type Track = 'community' | 'major';

	let track = $state<Track>('community');
	let selectedSmall = $state<number | null>(null);
	let customAmount = $state('');
	let isRecurring = $state(false);
	let isSubmitting = $state(false);

	const smallTiers = siteConfig.donationTiersSmall;
	const largeTiers = siteConfig.donationTiersLarge;

	function selectSmall(amount: number) {
		selectedSmall = amount;
		customAmount = '';
	}

	function handleCustomChange(e: Event) {
		customAmount = (e.target as HTMLInputElement).value;
		if (customAmount) selectedSmall = null;
	}

	async function handleDonate(amountDollars?: number) {
		const dollars = amountDollars ?? selectedSmall ?? parseFloat(customAmount);
		if (!dollars || dollars < 1) {
			toast.error('Please select or enter a donation amount');
			return;
		}
		isSubmitting = true;
		try {
			const res = await fetch('/api/stripe/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ amount: Math.round(dollars * 100), recurring: isRecurring })
			});
			const data = await res.json();
			if (res.ok && data.url) {
				window.location.href = data.url;
			} else {
				toast.error(data.message || 'Failed to process donation');
			}
		} catch {
			toast.error('Something went wrong. Please try again.');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<!-- Track Toggle -->
<div
	style="
		display: flex;
		border: 1px solid rgba(255,255,255,0.08);
		border-radius: 4px;
		overflow: hidden;
		margin-bottom: 36px;
	"
>
	<button
		type="button"
		onclick={() => { track = 'community'; selectedSmall = null; customAmount = ''; }}
		style="
			flex: 1;
			padding: 12px;
			font-family: 'Noto Sans', sans-serif;
			font-size: 11px;
			font-weight: 700;
			letter-spacing: 0.15em;
			text-transform: uppercase;
			border: none;
			cursor: pointer;
			transition: background 0.25s ease, color 0.25s ease;
			background: {track === 'community' ? '#FACC61' : 'transparent'};
			color: {track === 'community' ? '#1E1E1E' : '#8A867C'};
		"
	>Community Gift</button>
	<button
		type="button"
		onclick={() => { track = 'major'; selectedSmall = null; customAmount = ''; }}
		style="
			flex: 1;
			padding: 12px;
			font-family: 'Noto Sans', sans-serif;
			font-size: 11px;
			font-weight: 700;
			letter-spacing: 0.15em;
			text-transform: uppercase;
			border: none;
			border-left: 1px solid rgba(255,255,255,0.08);
			cursor: pointer;
			transition: background 0.25s ease, color 0.25s ease;
			background: {track === 'major' ? '#FACC61' : 'transparent'};
			color: {track === 'major' ? '#1E1E1E' : '#8A867C'};
		"
	>Major Gift</button>
</div>

{#if track === 'community'}
	<!-- Community track: preset amounts + custom -->
	<div style="margin-bottom: 28px;">
		<div
			style="
				font-family: 'Noto Sans', sans-serif;
				font-size: 10px;
				font-weight: 700;
				letter-spacing: 0.18em;
				text-transform: uppercase;
				color: #8A867C;
				margin-bottom: 14px;
			"
		>Select Amount</div>

		<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 16px;">
			{#each smallTiers as tier}
				<button
					type="button"
					onclick={() => selectSmall(tier.amount)}
					disabled={isSubmitting}
					style="
						position: relative;
						padding: 16px 12px;
						text-align: center;
						border: 1px solid {selectedSmall === tier.amount ? '#FACC61' : 'rgba(255,255,255,0.1)'};
						background: {selectedSmall === tier.amount ? 'rgba(250,204,97,0.08)' : 'transparent'};
						border-radius: 4px;
						cursor: pointer;
						transition: border-color 0.2s, background 0.2s;
					"
				>
					<div
						style="
							font-family: 'Noto Serif', Georgia, serif;
							font-size: 22px;
							font-weight: 700;
							color: {selectedSmall === tier.amount ? '#FACC61' : '#F5F3EC'};
						"
					>{tier.label}</div>
					{#if selectedSmall === tier.amount && tier.benefits.length}
						<div style="margin-top: 8px; font-size: 11px; color: #8A867C; line-height: 1.4;">
							{tier.benefits[0]}
						</div>
					{/if}
				</button>
			{/each}
		</div>

		<!-- Custom amount -->
		<div style="position: relative;">
			<span
				style="
					position: absolute;
					left: 14px;
					top: 50%;
					transform: translateY(-50%);
					font-family: 'Noto Sans', sans-serif;
					font-size: 14px;
					color: #8A867C;
				"
			>$</span>
			<input
				type="number"
				min="1"
				step="1"
				value={customAmount}
				oninput={handleCustomChange}
				placeholder="Custom amount"
				disabled={isSubmitting}
				style="
					width: 100%;
					padding: 14px 14px 14px 28px;
					background: transparent;
					border: 1px solid rgba(255,255,255,0.1);
					border-radius: 4px;
					font-family: 'Noto Serif', Georgia, serif;
					font-size: 16px;
					color: #F5F3EC;
					outline: none;
					transition: border-color 0.2s;
				"
				onfocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(250,204,97,0.4)'; }}
				onblur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
			/>
		</div>
	</div>

	<!-- Recurring toggle -->
	<label
		style="
			display: flex;
			align-items: center;
			gap: 10px;
			cursor: pointer;
			margin-bottom: 28px;
		"
	>
		<input
			type="checkbox"
			bind:checked={isRecurring}
			disabled={isSubmitting}
			style="width: 16px; height: 16px; accent-color: #FACC61; cursor: pointer;"
		/>
		<span style="font-family:'Noto Sans',sans-serif; font-size:13px; color:#C9C5B8;">
			Make this a monthly recurring gift
		</span>
	</label>

	<!-- Donate button -->
	<button
		type="button"
		onclick={() => handleDonate()}
		disabled={isSubmitting || (!selectedSmall && !customAmount)}
		style="
			width: 100%;
			height: 52px;
			background: #FACC61;
			font-family: 'Noto Sans', sans-serif;
			font-size: 11px;
			font-weight: 700;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: #1E1E1E;
			border: none;
			border-radius: 4px;
			cursor: pointer;
			transition: background 0.2s;
			opacity: {isSubmitting || (!selectedSmall && !customAmount) ? '0.45' : '1'};
		"
		onmouseenter={(e) => { if (!(e.currentTarget as HTMLButtonElement).disabled) (e.currentTarget as HTMLElement).style.background = '#f5c040'; }}
		onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = '#FACC61'; }}
	>
		{#if isSubmitting}
			Processing…
		{:else}
			Donate {selectedSmall ? `$${selectedSmall.toLocaleString()}` : customAmount ? `$${parseFloat(customAmount).toLocaleString()}` : ''}
			{isRecurring ? '/month' : ''}
		{/if}
	</button>

{:else}
	<!-- Major gift track: tier cards -->
	<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px;" class="tier-grid">
		{#each largeTiers as tier}
			<div
				style="
					background: {tier.featured ? 'rgba(250,204,97,0.06)' : 'transparent'};
					border: 1px solid {tier.featured ? 'rgba(250,204,97,0.35)' : 'rgba(255,255,255,0.08)'};
					border-radius: 4px;
					padding: 24px 20px;
					display: flex;
					flex-direction: column;
					gap: 10px;
				"
			>
				<div style="font-family:'Noto Sans',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:#FACC61;">{tier.name}</div>
				<div style="font-family:'Noto Serif',Georgia,serif; font-size:22px; font-weight:700; color:#F5F3EC;">{tier.range}</div>
				<p style="font-size:13px; color:#C9C5B8; line-height:1.6; font-weight:300; flex:1;">{tier.benefits}</p>

				{#if tier.isDaf}
					<a
						href="mailto:{siteConfig.contact.john}?subject=DAF Recommendation — Pilgrimage"
						style="
							display: inline-flex;
							align-items: center;
							justify-content: center;
							height: 40px;
							padding: 0 16px;
							border: 1px solid rgba(250,204,97,0.3);
							font-family: 'Noto Sans', sans-serif;
							font-size: 10px;
							font-weight: 700;
							letter-spacing: 0.15em;
							text-transform: uppercase;
							color: #FACC61;
							text-decoration: none;
							border-radius: 4px;
							transition: background 0.2s;
						"
					>Contact John</a>
				{:else if tier.amountCents >= 2500000}
					<a
						href="mailto:{siteConfig.contact.john}?subject=Executive Producer — Pilgrimage"
						style="
							display: inline-flex;
							align-items: center;
							justify-content: center;
							height: 40px;
							padding: 0 16px;
							background: #FACC61;
							font-family: 'Noto Sans', sans-serif;
							font-size: 10px;
							font-weight: 700;
							letter-spacing: 0.15em;
							text-transform: uppercase;
							color: #1E1E1E;
							text-decoration: none;
							border-radius: 4px;
							transition: background 0.2s;
						"
					>Contact John</a>
				{:else}
					<button
						type="button"
						onclick={() => handleDonate(tier.amountCents / 100)}
						disabled={isSubmitting}
						style="
							height: 40px;
							padding: 0 16px;
							background: transparent;
							border: 1px solid rgba(250,204,97,0.3);
							font-family: 'Noto Sans', sans-serif;
							font-size: 10px;
							font-weight: 700;
							letter-spacing: 0.15em;
							text-transform: uppercase;
							color: #FACC61;
							border-radius: 4px;
							cursor: pointer;
							transition: background 0.2s, color 0.2s;
						"
						onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(250,204,97,0.1)'; }}
						onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
					>
						{isSubmitting ? 'Processing…' : 'Donate via Stripe'}
					</button>
				{/if}
			</div>
		{/each}
	</div>

	<p style="font-family:'Noto Sans',sans-serif; font-size:12px; color:#8A867C; text-align:center; line-height:1.7;">
		For gifts over $5,000 or DAF recommendations, we recommend connecting directly.<br />
		<a href="mailto:{siteConfig.contact.john}" style="color:#FACC61; text-decoration:none;">{siteConfig.contact.john}</a>
	</p>
{/if}

<!-- Direct transfer options -->
<div style="margin-top: 32px;">
	<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
		<div style="flex: 1; height: 1px; background: rgba(255,255,255,0.08);"></div>
		<span style="font-family:'Noto Sans',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#8A867C; white-space:nowrap;">Or transfer directly</span>
		<div style="flex: 1; height: 1px; background: rgba(255,255,255,0.08);"></div>
	</div>

	<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;" class="transfer-grid">
		<a
			href="https://wise.com/pay/me/johne258"
			target="_blank"
			rel="noopener noreferrer"
			style="
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 8px;
				height: 48px;
				border: 1px solid rgba(105,198,140,0.35);
				border-radius: 4px;
				font-family: 'Noto Sans', sans-serif;
				font-size: 11px;
				font-weight: 700;
				letter-spacing: 0.15em;
				text-transform: uppercase;
				color: #69C68C;
				text-decoration: none;
				transition: background 0.2s, border-color 0.2s;
			"
			onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(105,198,140,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(105,198,140,0.6)'; }}
			onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(105,198,140,0.35)'; }}
		>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="none"/>
				<path d="M3 10h18M3 14h18M12 3a9 9 0 0 1 0 18A9 9 0 0 1 12 3z" stroke="#69C68C" stroke-width="1.5" stroke-linecap="round"/>
				<path d="M12 3c-2 2.5-3 5.5-3 9s1 6.5 3 9M12 3c2 2.5 3 5.5 3 9s-1 6.5-3 9" stroke="#69C68C" stroke-width="1.5" stroke-linecap="round"/>
			</svg>
			Wise
		</a>

		<a
			href="https://revolut.me/iamjohndass"
			target="_blank"
			rel="noopener noreferrer"
			style="
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 8px;
				height: 48px;
				border: 1px solid rgba(130,140,255,0.35);
				border-radius: 4px;
				font-family: 'Noto Sans', sans-serif;
				font-size: 11px;
				font-weight: 700;
				letter-spacing: 0.15em;
				text-transform: uppercase;
				color: #8A8CFF;
				text-decoration: none;
				transition: background 0.2s, border-color 0.2s;
			"
			onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(130,140,255,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(130,140,255,0.6)'; }}
			onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(130,140,255,0.35)'; }}
		>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="3" y="3" width="18" height="18" rx="5" stroke="#8A8CFF" stroke-width="1.5"/>
				<path d="M8 12h8M12 8v8" stroke="#8A8CFF" stroke-width="1.5" stroke-linecap="round"/>
			</svg>
			Revolut
		</a>
	</div>

	<p style="margin-top: 12px; font-family:'Noto Sans',sans-serif; font-size:11px; text-align:center; color:#8A867C; letter-spacing:0.05em;">
		Direct transfers land straight in the production budget
	</p>
</div>

<p style="margin-top: 16px; font-family:'Noto Sans',sans-serif; font-size:11px; text-align:center; color:#8A867C; letter-spacing:0.05em;">
	Secure payment via Stripe · Fiscally sponsored by The Fountain (501c3)
</p>

<style>
	@media (max-width: 480px) {
		.tier-grid {
			grid-template-columns: 1fr !important;
		}
		.transfer-grid {
			grid-template-columns: 1fr !important;
		}
	}
</style>
