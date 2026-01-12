<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { mode, toggleMode } from 'mode-watcher';
	import { browser } from '$app/environment';

	let mobileMenuOpen = $state(false);

	// Safe mode access for SSR
	let currentMode = $derived(browser ? $mode : 'light');

	const navigation = [
		{ name: 'Home', href: '/' },
		{ name: 'Pilgrims', href: '/pilgrims' },
		{ name: 'About', href: '/about' },
		{ name: 'Shaktipat', href: '/shaktipat' },
		{ name: 'Press', href: '/press' },
	];

	function isActive(href: string): boolean {
		if (href === '/') {
			return $page.url.pathname === '/';
		}
		return $page.url.pathname.startsWith(href);
	}
</script>

<header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
	<nav class="container-custom">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-3">
					<!-- Placeholder for Amazigh logo - will be replaced with actual SVG -->
					<div class="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
						<span class="text-white font-serif font-bold text-lg">ⵣ</span>
					</div>
					<span class="hidden font-serif text-xl font-bold sm:inline-block">
						The Pilgrimage
					</span>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex md:items-center md:space-x-6">
				{#each navigation as item}
					<a
						href={item.href}
						class={cn(
							"text-sm font-medium transition-colors hover:text-primary",
							isActive(item.href)
								? "text-foreground"
								: "text-foreground/60"
						)}
					>
						{item.name}
					</a>
				{/each}

				<!-- Theme Toggle -->
				<button
					onclick={toggleMode}
					class="inline-flex items-center justify-center rounded-md p-2 text-foreground/60 hover:text-foreground hover:bg-accent transition-colors"
					aria-label="Toggle theme"
				>
					{#if currentMode === 'light'}
						<!-- Moon icon -->
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
						</svg>
					{:else}
						<!-- Sun icon -->
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					{/if}
				</button>

				<!-- Donate CTA -->
				<a
					href="/donate"
					class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
				>
					Donate
				</a>
			</div>

			<!-- Mobile: Theme Toggle + Menu Button -->
			<div class="md:hidden flex items-center gap-2">
				<!-- Theme Toggle Mobile -->
				<button
					onclick={toggleMode}
					class="inline-flex items-center justify-center rounded-md p-2 text-foreground/60 hover:text-foreground hover:bg-accent transition-colors"
					aria-label="Toggle theme"
				>
					{#if currentMode === 'light'}
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
						</svg>
					{:else}
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					{/if}
				</button>

				<!-- Mobile menu button -->
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-md p-2 text-foreground/60 hover:bg-accent hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
					onclick={() => mobileMenuOpen = !mobileMenuOpen}
					aria-expanded={mobileMenuOpen}
				>
					<span class="sr-only">Open main menu</span>
					{#if mobileMenuOpen}
						<!-- X icon -->
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<!-- Hamburger icon -->
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
						</svg>
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden pb-4 pt-2 space-y-1">
				{#each navigation as item}
					<a
						href={item.href}
						class={cn(
							"block rounded-md px-3 py-2 text-base font-medium transition-colors",
							isActive(item.href)
								? "bg-accent text-foreground"
								: "text-foreground/60 hover:bg-accent hover:text-foreground"
						)}
						onclick={() => mobileMenuOpen = false}
					>
						{item.name}
					</a>
				{/each}
				<a
					href="/donate"
					class="block rounded-md bg-primary px-3 py-2 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
					onclick={() => mobileMenuOpen = false}
				>
					Donate
				</a>
			</div>
		{/if}
	</nav>
</header>
