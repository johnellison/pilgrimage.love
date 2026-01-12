# Premium Cinematic Design Implementation

## Overview
This document outlines the Nano Banana-inspired premium cinematic design system implemented for Pilgrimage.love.

## Design Philosophy
The design takes inspiration from high-end documentary websites, with a focus on:
- **Cinematic typography** using Noto Serif
- **Minimalist aesthetics** with refined details
- **Premium interactions** with glows, scales, and smooth transitions
- **High contrast** color schemes for both light and dark modes
- **Intentional whitespace** and generous spacing

## Color System

### Light Mode
- **Background**: `#F5F3EC` - Warm cream paper
- **Foreground**: `#1E1E1E` - Deep black text
- **Card**: `#EBE9E1` - Soft cream cards
- **Primary**: `#FACC61` - Golden yellow accent
- **Secondary**: `#E07A5F` - Terracotta
- **Muted**: `#4A4A4A` - Subdued text

### Dark Mode
- **Background**: `#1E1E1E` - Deep black
- **Foreground**: `#F5F3EC` - Warm cream text
- **Card**: `#252525` - Elevated surfaces
- **Primary**: `#FACC61` - Golden yellow (consistent)
- **Muted**: `#A8A29E` - Subdued text
- **Border**: `#333` - Subtle borders

### Section Backgrounds (Dark Mode)
- **Main**: `#1E1E1E`
- **Alternate 1**: `#181818`
- **Alternate 2**: `#151515`

## Typography

### Fonts
- **Display & Body**: Noto Serif (weights 100-900, italic)
- **Labels & UI**: Noto Sans (for uppercase tracking-wide labels)

### Scale
- **H1**: 5xl → 7xl → 8xl (responsive)
- **H2**: 3xl → 4xl → 5xl
- **H3**: xl → 2xl
- **Body**: 1rem (16px), light weight (300)
- **Quotes**: 1.5rem (24px), italic

### Letter Spacing
- **Headings**: -0.02em (tight)
- **Uppercase labels**: 0.2em (wide tracking)

## Border Radius
Following minimal aesthetic:
- **Default**: 2px
- **Small**: 2px
- **Large**: 4-8px
- **Buttons**: 2px

## Key Design Patterns

### 1. Sticky Header with Backdrop Blur
```svelte
<header class="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-header">
```
- Height: 16 (64px)
- Centered logo (ⵣ symbol) with glow on hover
- Navigation split left/right on desktop
- Support button with border and hover fill

### 2. Hero Section
- Radial gradient background
- Uppercase label: "A Sacred Documentary"
- Large serif headline
- Light-weight description
- Video with glow effect on hover
- Uppercase button labels

### 3. Video Glow Effect
```css
.video-glow::before {
  content: '';
  position: absolute;
  inset: -4px;
  background: linear-gradient(to right, primary/20, primary/10, primary/20);
  filter: blur(20px);
  opacity: 0.4;
  transition: opacity 700ms;
}
```
Increases to 0.6 opacity on hover.

### 4. Mission Cards
- Border-left accent bars (`.accent-bar`)
- Aspect square images
- Hover: scale(1.05) on images (700ms duration)
- Black overlay (20%) fades out on hover
- Title changes to primary color on hover

### 5. Pilgrim Cards
- Aspect ratio 3:5 (portrait)
- Gradient overlay from bottom (black/90 → transparent)
- Uppercase location label in primary color
- Name in white at bottom
- Hover: image scale(1.05)

### 6. Quote Sections
```css
.quote-large::before {
  content: '"';
  position: absolute;
  font-size: 4rem;
  color: primary/40;
}
```
- Large quotation mark (4rem)
- Italic serif text (3xl-4xl)
- Border-left on quote container

### 7. Progress Bars
```css
.progress-glow {
  box-shadow: 0 0 15px rgba(250, 204, 97, 0.5);
}
```
Golden glow effect on filled portion.

### 8. Button Styles
**Primary CTA**:
- Background: primary
- Uppercase tracking-wide text
- Hover: shadow glow `0 0 20px primary/30`
- Active: scale(0.98)

**Secondary CTA**:
- Border: foreground/20
- Hover: border → primary, text → primary, bg → primary/5

### 9. Custom Scrollbar (Dark Mode)
- Width: 8px
- Track: #1E1E1E
- Thumb: #333
- Thumb hover: #FACC61 (primary)

## Motion Design

### Timing Functions
- **Fast**: 200ms
- **Normal**: 300ms
- **Slow**: 500ms
- **Slower**: 700ms

### Easing
- **Ease-out**: cubic-bezier(0, 0, 0.2, 1)
- **Ease-in-out**: cubic-bezier(0.4, 0, 0.2, 1)

### Reveal Animations
- **reveal**: translateY(30px) + opacity
- **reveal-fade**: opacity only
- **reveal-scale**: scale(0.97) + opacity
- **reveal-left/right**: translateX + opacity

### Stagger Delays
- Child 1: 0ms
- Child 2: 100ms
- Child 3: 200ms
- Child 4: 300ms
- Child 5: 400ms
- Child 6: 500ms

### Hover Effects
- **Images**: scale(1.05) over 700ms
- **Cards**: translateY(-4px)
- **Overlays**: fade out over 300-500ms
- **Text colors**: transition to primary over 200-300ms

## Accessibility

### Reduced Motion
All animations disabled when user prefers reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Selection Colors
- Background: primary (#FACC61)
- Text: primary-foreground (#1E1E1E)

### Focus States
- Ring color: primary
- Clear focus indicators on all interactive elements

## Component Updates

### Updated Files
1. **src/app.css** - Complete design system overhaul
2. **src/lib/components/layout/Header.svelte** - Premium sticky header
3. **src/lib/components/home/VideoEmbed.svelte** - Glow effect wrapper
4. **src/lib/components/pilgrims/PilgrimCard.svelte** - Portrait card with gradient overlay
5. **src/routes/+page.svelte** - Hero, mission, and story sections
6. **tailwind.config.js** - Font family updates, gradient-radial utility

## Utility Classes

### Custom Utilities
- `.label-uppercase` - Noto Sans, xs, bold, tracking-[0.2em], uppercase
- `.accent-bar` - border-l-2 border-primary/50 pl-6
- `.video-glow` - Glow effect wrapper
- `.progress-glow` - Progress bar glow
- `.quote-large` - Large quotation mark styling
- `.sepia-light` - Sepia filter that removes on hover (light mode)
- `.grayscale-light` - Grayscale filter that removes on hover

### Section Classes
- `.section-dark` - bg: #181818 (dark mode alternating)
- `.section-darker` - bg: #151515 (dark mode alternating)
- `.section-light-alt` - bg: #252525 (dark mode cards)

## Implementation Notes

### Fonts
Both Noto Serif and Noto Sans are loaded from Google Fonts with full weight ranges (100-900) and italic support.

### Dark Mode Toggle
Existing mode-watcher integration maintained. Colors automatically switch between light/dark palettes.

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Browser Support
- Modern browsers with CSS Grid, Flexbox, backdrop-filter
- Graceful degradation for backdrop-filter

## Future Enhancements

Consider adding:
1. Real images for mission cards
2. Animated play button in video placeholder
3. Parallax scrolling effects
4. Lottie animations for loading states
5. More sophisticated hover states with cursor following
6. Noise texture overlays for added depth

## References
- Nano Banana dark theme: High contrast, golden accents, Noto Serif
- Nano Banana light theme: Cream backgrounds, sepia filters, terracotta accents
