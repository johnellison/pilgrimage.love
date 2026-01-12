<script lang="ts">
	interface Props {
		url: string;
		title: string;
		autoplay?: boolean;
		muted?: boolean;
	}

	let { url, title, autoplay = false, muted = true }: Props = $props();

	// Determine if it's YouTube or Vimeo
	function getEmbedUrl(url: string): string {
		if (!url) return '';

		// YouTube
		if (url.includes('youtube.com') || url.includes('youtu.be')) {
			const videoId = url.includes('youtu.be')
				? url.split('youtu.be/')[1]?.split('?')[0]
				: url.split('v=')[1]?.split('&')[0];
			return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}`;
		}

		// Vimeo
		if (url.includes('vimeo.com')) {
			const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
			return `https://player.vimeo.com/video/${videoId}?autoplay=${autoplay ? 1 : 0}&muted=${muted ? 1 : 0}`;
		}

		// Already an embed URL
		return url;
	}

	const embedUrl = $derived(getEmbedUrl(url));
	const hasVideo = $derived(!!url && url.length > 0);
</script>

{#if hasVideo}
	<div class="relative aspect-video w-full overflow-hidden rounded-lg bg-sacred-earth-100 shadow-lg">
		<iframe
			src={embedUrl}
			{title}
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
			class="absolute inset-0 h-full w-full"
			loading="lazy"
		></iframe>
	</div>
{:else}
	<!-- Placeholder when no video URL is provided -->
	<div class="relative aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-sacred-earth-100 to-ganges-blue-100 shadow-lg flex items-center justify-center">
		<div class="text-center p-8">
			<svg class="w-16 h-16 mx-auto mb-4 text-sacred-earth-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<p class="text-sacred-earth-600 font-medium">{title}</p>
			<p class="text-sacred-earth-500 text-sm mt-2">Video coming soon</p>
		</div>
	</div>
{/if}
