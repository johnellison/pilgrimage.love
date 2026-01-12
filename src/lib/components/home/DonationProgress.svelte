<script lang="ts">
	import { getFundingProgress } from '$lib/config/site';

	const progress = getFundingProgress();

	// Format currency
	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	}
</script>

<div class="w-full">
	<div class="text-center mb-4">
		<div class="text-sm text-muted-foreground mb-2">
			{formatCurrency(progress.raised)} raised of {formatCurrency(progress.goal)} goal
		</div>
		<div class="relative w-full bg-sacred-earth-200 rounded-full h-4 overflow-hidden">
			<div
				class="bg-gradient-to-r from-saffron-500 to-saffron-600 h-4 rounded-full transition-all duration-1000 ease-out"
				style="width: {progress.percentage}%"
			></div>
			{#if progress.percentage > 20}
				<div class="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
					{progress.percentage.toFixed(1)}%
				</div>
			{/if}
		</div>
	</div>

	{#if !progress.isComplete}
		<p class="text-sm text-center text-muted-foreground">
			{formatCurrency(progress.remaining)} remaining to reach our goal
		</p>
	{:else}
		<p class="text-sm text-center text-saffron-600 font-medium">
			🎉 Goal reached! Thank you for your support!
		</p>
	{/if}
</div>
