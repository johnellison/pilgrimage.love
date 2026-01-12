<script lang="ts">
	import { toast } from 'svelte-sonner';

	let email = $state('');
	let isSubmitting = $state(false);
	let isSuccess = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (!email || !email.includes('@')) {
			toast.error('Please enter a valid email address');
			return;
		}

		isSubmitting = true;

		try {
			const response = await fetch('/api/email/subscribe', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});

			const data = await response.json();

			if (response.ok) {
				isSuccess = true;
				toast.success('Thank you! Check your email to confirm your subscription.');
				email = '';
			} else {
				toast.error(data.message || 'Something went wrong. Please try again.');
			}
		} catch (error) {
			toast.error('Failed to subscribe. Please try again later.');
			console.error('Subscription error:', error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="w-full max-w-md mx-auto">
	<form onsubmit={handleSubmit} class="flex flex-col sm:flex-row gap-3">
		<input
			type="email"
			bind:value={email}
			placeholder="Enter your email"
			disabled={isSubmitting || isSuccess}
			class="flex-1 rounded-md border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			required
		/>
		<button
			type="submit"
			disabled={isSubmitting || isSuccess}
			class="inline-flex items-center justify-center rounded-md bg-saffron-600 px-6 py-3 text-sm font-medium text-white hover:bg-saffron-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors whitespace-nowrap"
		>
			{#if isSubmitting}
				Subscribing...
			{:else if isSuccess}
				Subscribed ✓
			{:else}
				Join Us
			{/if}
		</button>
	</form>
	<p class="text-xs text-muted-foreground mt-3 text-center">
		Receive updates, teachings, and invitations. We respect your privacy.
	</p>
</div>
