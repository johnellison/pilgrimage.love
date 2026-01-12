<script lang="ts">
	import { siteConfig } from '$lib/config/site';
	import { toast } from 'svelte-sonner';

	let selectedAmount = $state<number | null>(null);
	let customAmount = $state('');
	let isRecurring = $state(false);
	let isSubmitting = $state(false);

	const tiers = siteConfig.donationTiers;

	async function handleDonate() {
		const amount = selectedAmount || parseFloat(customAmount);

		if (!amount || amount < 1) {
			toast.error('Please select or enter a donation amount');
			return;
		}

		isSubmitting = true;

		try {
			const response = await fetch('/api/stripe/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					amount: Math.round(amount * 100), // Convert to cents
					recurring: isRecurring
				})
			});

			const data = await response.json();

			if (response.ok && data.url) {
				// Redirect to Stripe Checkout
				window.location.href = data.url;
			} else {
				toast.error(data.message || 'Failed to process donation');
			}
		} catch (error) {
			toast.error('Something went wrong. Please try again.');
			console.error('Donation error:', error);
		} finally {
			isSubmitting = false;
		}
	}

	function selectAmount(amount: number) {
		selectedAmount = amount;
		customAmount = '';
	}

	function handleCustomAmountChange(e: Event) {
		const input = e.target as HTMLInputElement;
		customAmount = input.value;
		if (customAmount) {
			selectedAmount = null;
		}
	}
</script>

<div class="space-y-6">
	<!-- Preset Amounts -->
	<div>
		<label class="block text-sm font-medium text-foreground mb-3">
			Select Amount
		</label>
		<div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
			{#each tiers as tier}
				<button
					type="button"
					onclick={() => selectAmount(tier.amount)}
					class="relative rounded-lg border-2 p-4 text-center transition-all {selectedAmount === tier.amount ? 'border-saffron-600 bg-saffron-50' : 'border-border hover:border-saffron-300'}"
					disabled={isSubmitting}
				>
					<div class="text-2xl font-bold text-foreground">{tier.label}</div>
					{#if selectedAmount === tier.amount}
						<div class="absolute top-2 right-2 text-saffron-600">
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
						</div>
					{/if}
				</button>
			{/each}
		</div>
	</div>

	<!-- Custom Amount -->
	<div>
		<label for="custom-amount" class="block text-sm font-medium text-foreground mb-2">
			Or Enter Custom Amount
		</label>
		<div class="relative">
			<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
				<span class="text-muted-foreground sm:text-sm">$</span>
			</div>
			<input
				id="custom-amount"
				type="number"
				min="1"
				step="1"
				bind:value={customAmount}
				oninput={handleCustomAmountChange}
				placeholder="Enter amount"
				disabled={isSubmitting}
				class="block w-full rounded-md border border-input bg-background py-3 pl-7 pr-12 text-foreground placeholder:text-muted-foreground focus:border-saffron-600 focus:outline-none focus:ring-1 focus:ring-saffron-600 disabled:cursor-not-allowed disabled:opacity-50"
			/>
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<span class="text-muted-foreground sm:text-sm">USD</span>
			</div>
		</div>
	</div>

	<!-- Recurring Option -->
	<div class="flex items-center gap-3">
		<input
			id="recurring"
			type="checkbox"
			bind:checked={isRecurring}
			disabled={isSubmitting}
			class="h-4 w-4 rounded border-gray-300 text-saffron-600 focus:ring-saffron-600"
		/>
		<label for="recurring" class="text-sm text-foreground cursor-pointer">
			Make this a monthly recurring donation
		</label>
	</div>

	<!-- Benefits Display -->
	{#if selectedAmount}
		{@const selectedTier = tiers.find(t => t.amount === selectedAmount)}
		{#if selectedTier && selectedTier.benefits.length > 0}
			<div class="rounded-lg border border-saffron-200 bg-saffron-50 p-4">
				<h4 class="text-sm font-semibold text-saffron-900 mb-2">Your Benefits:</h4>
				<ul class="space-y-1">
					{#each selectedTier.benefits as benefit}
						<li class="text-sm text-saffron-800 flex items-start gap-2">
							<svg class="w-4 h-4 text-saffron-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							{benefit}
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	{/if}

	<!-- Donate Button -->
	<button
		type="button"
		onclick={handleDonate}
		disabled={isSubmitting || (!selectedAmount && !customAmount)}
		class="w-full rounded-md bg-saffron-600 px-6 py-4 text-base font-semibold text-white hover:bg-saffron-700 focus:outline-none focus:ring-2 focus:ring-saffron-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
	>
		{#if isSubmitting}
			Processing...
		{:else}
			Donate {selectedAmount ? `$${selectedAmount}` : customAmount ? `$${customAmount}` : ''}
			{isRecurring ? '/month' : ''}
		{/if}
	</button>

	<p class="text-xs text-center text-muted-foreground">
		Secure payment powered by Stripe. 33% of profits support wisdom keepers.
	</p>
</div>
