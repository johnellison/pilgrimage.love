<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { PUBLIC_CRYPTO_WALLET_ETH, PUBLIC_CRYPTO_WALLET_BTC } from '$env/static/public';

	interface Props {
		type: 'eth' | 'btc';
	}

	let { type }: Props = $props();

	const walletAddress = $derived(type === 'eth' ? PUBLIC_CRYPTO_WALLET_ETH : PUBLIC_CRYPTO_WALLET_BTC);
	const cryptoName = $derived(type === 'eth' ? 'Ethereum' : 'Bitcoin');
	const shortAddress = $derived(walletAddress ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}` : '');

	// QR code URL (using qrcode.tec-it.com as a free service)
	const qrCodeUrl = $derived(walletAddress ? `https://qrcode.tec-it.com/API/QRCode?data=${encodeURIComponent(walletAddress)}&size=medium&backcolor=%23ffffff` : '');

	function copyToClipboard() {
		if (walletAddress) {
			navigator.clipboard.writeText(walletAddress);
			toast.success('Wallet address copied to clipboard!');
		}
	}
</script>

{#if walletAddress && walletAddress.length > 0}
	<div class="border border-border rounded-lg p-6 space-y-4">
		<div class="flex items-center gap-3">
			{#if type === 'eth'}
				<div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-600 flex items-center justify-center text-white font-bold">
					Ξ
				</div>
			{:else}
				<div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-600 flex items-center justify-center text-white font-bold">
					₿
				</div>
			{/if}
			<div>
				<h3 class="font-semibold text-foreground">{cryptoName}</h3>
				<p class="text-sm text-muted-foreground">Scan or copy address</p>
			</div>
		</div>

		<!-- QR Code -->
		<div class="flex justify-center py-4">
			<img src={qrCodeUrl} alt="{cryptoName} QR Code" class="w-48 h-48 rounded-lg" />
		</div>

		<!-- Wallet Address -->
		<div class="space-y-2">
			<div class="flex items-center gap-2">
				<input
					type="text"
					readonly
					value={walletAddress}
					class="flex-1 rounded-md border border-input bg-muted px-3 py-2 text-xs font-mono text-foreground/70 focus:outline-none"
				/>
				<button
					onclick={copyToClipboard}
					class="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors"
					title="Copy address"
				>
					<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
					</svg>
				</button>
			</div>
			<p class="text-xs text-muted-foreground text-center">
				Send {cryptoName} to this address
			</p>
		</div>
	</div>
{:else}
	<!-- Placeholder when wallet not configured -->
	<div class="border border-border rounded-lg p-6 text-center text-muted-foreground">
		<p class="text-sm">{cryptoName} wallet address not yet configured</p>
		<p class="text-xs mt-2">Check back soon for crypto donation option</p>
	</div>
{/if}
