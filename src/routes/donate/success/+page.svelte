<script lang="ts">
	import { page } from '$app/stores';

	const sessionId = $derived($page.url.searchParams.get('session_id'));
</script>

<div class="container-custom section-spacing">
	<div class="max-w-2xl mx-auto text-center">
		<div class="mb-8">
			<div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
				<svg class="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
			</div>

			<h1 class="text-4xl font-serif font-bold text-foreground mb-4">
				Thank You!
			</h1>
			<p class="text-lg text-foreground/80 mb-8">
				Your donation has been received. You're helping bring The Pilgrimage to the world.
			</p>
		</div>

		<div class="bg-sacred-earth-50 rounded-lg p-6 mb-8 space-y-4 text-left">
			<h2 class="font-semibold text-foreground">What happens next?</h2>
			<ul class="space-y-3 text-sm text-foreground/80">
				<li class="flex gap-3">
					<span class="text-saffron-600">✓</span>
					<span>You'll receive an email confirmation with your receipt</span>
				</li>
				<li class="flex gap-3">
					<span class="text-saffron-600">✓</span>
					<span>Your name will be added to the film credits (if eligible)</span>
				</li>
				<li class="flex gap-3">
					<span class="text-saffron-600">✓</span>
					<span>You'll receive exclusive updates on post-production progress</span>
				</li>
				<li class="flex gap-3">
					<span class="text-saffron-600">✓</span>
					<span>33% of profits will support the wisdom keepers featured in the film</span>
				</li>
			</ul>
		</div>

		{#if sessionId}
			<p class="text-xs text-muted-foreground mb-6">
				Transaction ID: {sessionId}
			</p>
		{/if}

		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a
				href="/"
				class="inline-flex items-center justify-center rounded-md bg-saffron-600 px-6 py-3 text-base font-medium text-white hover:bg-saffron-700 transition-colors"
			>
				Return Home
			</a>
			<a
				href="/pilgrims"
				class="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-base font-medium text-foreground hover:bg-accent transition-colors"
			>
				Meet the Pilgrims
			</a>
		</div>

		<div class="mt-12 pt-8 border-t border-border">
			<p class="text-sm text-muted-foreground mb-4">
				Share your support with others:
			</p>
			<div class="flex gap-4 justify-center">
				<a
					href="https://twitter.com/intent/tweet?text=I%20just%20supported%20The%20Pilgrimage%20documentary!%20Join%20me%20in%20funding%20this%20call%20to%20life.&url=https://pilgrimage.love"
					target="_blank"
					rel="noopener noreferrer"
					class="text-muted-foreground hover:text-foreground transition-colors"
				>
					Share on Twitter
				</a>
				<span class="text-muted-foreground">•</span>
				<a
					href="https://www.facebook.com/sharer/sharer.php?u=https://pilgrimage.love"
					target="_blank"
					rel="noopener noreferrer"
					class="text-muted-foreground hover:text-foreground transition-colors"
				>
					Share on Facebook
				</a>
			</div>
		</div>
	</div>
</div>
