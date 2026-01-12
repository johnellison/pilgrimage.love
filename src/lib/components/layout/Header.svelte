<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { mode, toggleMode } from 'mode-watcher';
	import { onMount } from 'svelte';

	let mobileMenuOpen = $state(false);
	let mounted = $state(false);

	// Only show theme toggle after mount to prevent hydration mismatch
	onMount(() => {
		mounted = true;
	});

	const leftNavigation = [
		{ name: 'Home', href: '/' },
		{ name: 'Pilgrims', href: '/pilgrims' },
	];

	const rightNavigation = [
		{ name: 'About', href: '/about' },
		{ name: 'Press', href: '/press' },
	];

	function isActive(href: string): boolean {
		if (href === '/') {
			return $page.url.pathname === '/';
		}
		return $page.url.pathname.startsWith(href);
	}
</script>

<header class="sticky top-0 z-50 w-full border-b border-border/50 bg-background/90 backdrop-blur-header transition-all">
	<nav class="container-custom">
		<div class="flex h-16 items-center justify-between">
			<!-- Left Navigation -->
			<nav class="hidden md:flex gap-8 text-sm font-medium tracking-wide flex-1">
				{#each leftNavigation as item}
					<a
						href={item.href}
						class={cn(
							"transition-colors",
							isActive(item.href)
								? "text-foreground"
								: "text-foreground/80 hover:text-primary"
						)}
					>
						{item.name}
					</a>
				{/each}
			</nav>

			<!-- Centered Logo -->
			<div class="flex items-center justify-center flex-1 md:flex-initial">
				<a href="/" class="group flex items-center justify-center">
					<span class="amazigh-symbol text-4xl text-primary group-hover:drop-shadow-[0_0_8px_rgba(250,204,97,0.6)] transition-all duration-500">ⵣ</span>
				</a>
			</div>

			<!-- Right Navigation -->
			<div class="hidden md:flex items-center gap-6 flex-1 justify-end">
				{#each rightNavigation as item}
					<a
						href={item.href}
						class={cn(
							"text-sm font-medium tracking-wide transition-colors",
							isActive(item.href)
								? "text-foreground"
								: "text-foreground/80 hover:text-primary"
						)}
					>
						{item.name}
					</a>
				{/each}

				<!-- Instagram -->
				<a
					href="https://instagram.com/pilgrimage.love"
					target="_blank"
					rel="noopener noreferrer"
					class="text-foreground/60 hover:text-primary transition-colors"
					aria-label="Instagram"
				>
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
					</svg>
				</a>

				<!-- Theme Toggle -->
				<button
					onclick={toggleMode}
					class="inline-flex items-center justify-center p-2 text-foreground/60 hover:text-primary transition-colors"
					aria-label="Toggle theme"
				>
					{#if !mounted}
						<div class="h-5 w-5"></div>
					{:else if mode.current === 'light'}
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
						</svg>
					{:else}
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					{/if}
				</button>

				<!-- Support CTA -->
				<a
					href="/donate"
					class="text-sm font-bold text-primary border border-primary/30 px-4 py-1.5 hover:bg-primary hover:text-primary-foreground transition-all rounded"
				>
					Support The Film
				</a>
			</div>

			<!-- Mobile: Menu Button -->
			<div class="md:hidden flex items-center gap-3">
				<!-- Theme Toggle Mobile -->
				<button
					onclick={toggleMode}
					class="inline-flex items-center justify-center p-2 text-foreground/60 hover:text-foreground transition-colors"
					aria-label="Toggle theme"
				>
					{#if !mounted}
						<div class="h-5 w-5"></div>
					{:else if mode.current === 'light'}
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
						</svg>
					{:else}
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					{/if}
				</button>

				<!-- Mobile menu button -->
				<button
					type="button"
					class="inline-flex items-center justify-center p-2 text-foreground/60 hover:text-foreground transition-colors"
					onclick={() => mobileMenuOpen = !mobileMenuOpen}
					aria-expanded={mobileMenuOpen}
				>
					<span class="sr-only">Open main menu</span>
					{#if mobileMenuOpen}
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
						</svg>
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden pb-6 pt-4 space-y-2 border-t border-border/40 mt-2">
				{#each [...leftNavigation, ...rightNavigation] as item}
					<a
						href={item.href}
						class={cn(
							"block px-4 py-3 text-base font-medium transition-colors rounded",
							isActive(item.href)
								? "text-foreground bg-muted/50"
								: "text-foreground/70 hover:text-foreground hover:bg-muted/30"
						)}
						onclick={() => mobileMenuOpen = false}
					>
						{item.name}
					</a>
				{/each}
				<a
					href="https://instagram.com/pilgrimage.love"
					target="_blank"
					rel="noopener noreferrer"
					class="block px-4 py-3 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-muted/30 transition-colors rounded"
					onclick={() => mobileMenuOpen = false}
				>
					Instagram
				</a>
				<a
					href="/donate"
					class="block mx-4 mt-4 text-center bg-primary px-4 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors rounded"
					onclick={() => mobileMenuOpen = false}
				>
					Support The Film
				</a>
			</div>
		{/if}
	</nav>
</header>
