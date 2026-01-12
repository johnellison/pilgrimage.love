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
		<div class="text-sm font-bold text-foreground mb-3 flex justify-between max-w-md mx-auto">
			<span>{formatCurrency(progress.raised)} raised</span>
			<span class="text-muted-foreground">Goal: {formatCurrency(progress.goal)}</span>
		</div>
		<div class="relative w-full h-2 bg-muted/20 rounded-full overflow-hidden max-w-md mx-auto dark:bg-white/10">
			<div
				class="h-full bg-primary progress-glow transition-all duration-1000 ease-out"
				style="width: {progress.percentage}%"
			></div>
		</div>
		<p class="text-xs text-muted-foreground mt-3 label-uppercase">
			{progress.percentage.toFixed(0)}% Funded
		</p>
	</div>

	{#if !progress.isComplete}
		<p class="text-sm text-center text-muted-foreground">
			{formatCurrency(progress.remaining)} remaining to reach our goal
		</p>
	{:else}
		<p class="text-sm text-center text-primary font-medium">
			Goal reached! Thank you for your support!
		</p>
	{/if}
</div>
