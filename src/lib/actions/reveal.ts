/**
 * Scroll Reveal Action
 * Triggers reveal animations when elements enter the viewport
 * Uses Intersection Observer for performance
 */

interface RevealOptions {
	threshold?: number;
	rootMargin?: string;
	once?: boolean;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const { threshold = 0.2, rootMargin = '0px 0px -50px 0px', once = true } = options;

	// Check for reduced motion preference
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReducedMotion) {
		// Skip animation for users who prefer reduced motion
		node.classList.add('revealed');
		return {
			destroy() {}
		};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.classList.add('revealed');
					if (once) {
						observer.unobserve(node);
					}
				} else if (!once) {
					node.classList.remove('revealed');
				}
			});
		},
		{
			threshold,
			rootMargin
		}
	);

	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}

/**
 * Stagger reveal for multiple children
 * Apply to parent, children will animate with staggered delay
 */
export function staggerReveal(node: HTMLElement, options: RevealOptions = {}) {
	const { threshold = 0.1, rootMargin = '0px 0px -30px 0px', once = true } = options;

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReducedMotion) {
		node.querySelectorAll('.reveal, .reveal-scale, .reveal-fade').forEach((child) => {
			child.classList.add('revealed');
		});
		return {
			destroy() {}
		};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// Reveal all children with stagger already applied via CSS
					node.querySelectorAll('.reveal, .reveal-scale, .reveal-fade, .reveal-left, .reveal-right').forEach((child) => {
						child.classList.add('revealed');
					});
					if (once) {
						observer.unobserve(node);
					}
				}
			});
		},
		{
			threshold,
			rootMargin
		}
	);

	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}
