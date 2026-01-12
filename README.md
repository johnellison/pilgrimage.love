# The Pilgrimage - Website

A fundraising and community platform for "The Pilgrimage" documentary film - chronicling a 14-day, 854-kilometer journey through India's Mahakumbh Mela with 27 pilgrims from 15 countries.

**Live Site**: [pilgrimage.love](https://pilgrimage.love)

## Tech Stack

- **Framework**: SvelteKit 5 + Vite
- **UI Components**: shadcn-svelte (https://www.shadcn-svelte.com/)
- **Styling**: Tailwind CSS
- **Payments**: Stripe + Cryptocurrency (ETH/BTC)
- **Email**: ConvertKit/Mailchimp
- **Fonts**: Crimson Pro (serif), Inter (sans-serif)
- **Deployment**: Vercel (adapter-vercel)
- **Analytics**: Plausible (privacy-focused)

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env

# Add your API keys to .env (see Configuration section)

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173`

## Project Structure

```
src/
├── routes/
│   ├── +page.svelte              # Home page
│   ├── +layout.svelte            # Root layout with Header/Footer
│   ├── about/+page.svelte        # Mission and team
│   ├── characters/+page.svelte   # Pilgrim profiles
│   ├── donate/+page.svelte       # Donation page
│   ├── shaktipat/+page.svelte    # Teachings
│   ├── press/+page.svelte        # Media kit
│   └── api/
│       ├── stripe/checkout/+server.ts    # Stripe integration
│       └── email/subscribe/+server.ts    # Email signup
├── lib/
│   ├── components/
│   │   ├── layout/               # Header, Footer, Navigation
│   │   ├── home/                 # Home page components
│   │   ├── characters/           # Character cards
│   │   └── donate/               # Donation forms, crypto widgets
│   ├── config/
│   │   └── site.ts               # Main site configuration
│   └── utils.ts                  # Utility functions
├── app.css                       # Global styles
└── app.html                      # HTML template
```

## Configuration

### 1. Environment Variables

Create `.env` file from `.env.example`:

```bash
# Stripe (get from https://dashboard.stripe.com/apikeys)
PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email Service (ConvertKit or Mailchimp)
EMAIL_API_KEY=your_api_key
EMAIL_FORM_ID=your_form_id

# Cryptocurrency Wallets
PUBLIC_CRYPTO_WALLET_ETH=0x...
PUBLIC_CRYPTO_WALLET_BTC=bc1...

# Site Configuration
PUBLIC_SITE_URL=http://localhost:5173  # Change to pilgrimage.love in production

# Analytics (optional)
PUBLIC_PLAUSIBLE_DOMAIN=pilgrimage.love
```

**Note**: Variables prefixed with `PUBLIC_` are exposed to the browser. Keep secret keys without this prefix.

### 2. Content Configuration

Edit `src/lib/config/site.ts` to update:

- Site name, tagline, description
- Fundraising goal and current amount raised
- Video URLs (YouTube or Vimeo)
- Character profiles (names, bios, quotes, images)
- Donation tiers and benefits
- Social media links
- Chuffed campaign URL

**Example**:
```typescript
export const siteConfig = {
  name: "The Pilgrimage",
  tagline: "A Call to Life",
  fundraising: {
    goal: 10000,
    raised: 2253,  // Update this as donations come in
    currency: "USD"
  },
  videos: {
    trailer3min: {
      url: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",  // ADD YOUR VIDEO URL
      title: "The Pilgrimage - 3 Minute Trailer"
    }
  },
  // ... more configuration
}
```

### 3. Images and Assets

Place your media files in the `static/` directory:

```
static/
├── images/
│   ├── characters/
│   │   ├── siriani.jpg         # Character photos
│   │   ├── yonatan.jpg
│   │   ├── john-fatima.jpg
│   │   ├── swami-ogi.jpg
│   │   ├── luke.jpg
│   │   └── guruji.jpg
│   ├── og-image.jpg            # Social media preview (1200x630px)
│   └── hero.jpg                # Hero section background (optional)
└── logos/
    └── amazigh-symbol.svg      # Main logo
```

Update image paths in `src/lib/config/site.ts`:

```typescript
characters: [
  {
    id: "siriani-txana",
    name: "Siriani Txana",
    image: "/images/characters/siriani.jpg",  // Path relative to static/
    // ...
  }
]
```

## Payment Integration

### Stripe Setup

1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
3. Add keys to `.env`
4. Uncomment Stripe code in `/src/routes/api/stripe/checkout/+server.ts`

**Key code to uncomment** (lines 12-39):
```typescript
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-12-18.acacia' });

const session = await stripe.checkout.sessions.create({
  line_items: [
    {
      price_data: {
        currency: 'usd',
        product_data: { name: 'The Pilgrimage Documentary - Donation' },
        unit_amount: amount,
        ...(recurring && { recurring: { interval: 'month' } })
      },
      quantity: 1
    }
  ],
  mode: recurring ? 'subscription' : 'payment',
  success_url: `${PUBLIC_SITE_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${PUBLIC_SITE_URL}/donate`
});

return json({ sessionId: session.id });
```

5. Test with [Stripe test cards](https://stripe.com/docs/testing):
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

6. Switch to live keys when ready to accept real donations

### Cryptocurrency Setup

1. Create Ethereum wallet (MetaMask, Coinbase, etc.)
2. Create Bitcoin wallet (Electrum, Ledger, etc.)
3. Add wallet addresses to `.env`:
   ```bash
   PUBLIC_CRYPTO_WALLET_ETH=0x1234...
   PUBLIC_CRYPTO_WALLET_BTC=bc1q5678...
   ```

QR codes are automatically generated using `qrcode.tec-it.com` API (free service).

## Email Integration

### Option 1: ConvertKit

1. Sign up at [convertkit.com](https://convertkit.com)
2. Create a form
3. Get API key from Account Settings
4. Add to `.env`:
   ```bash
   EMAIL_API_KEY=your_api_key
   EMAIL_FORM_ID=your_form_id
   ```
5. Uncomment ConvertKit code in `/src/routes/api/email/subscribe/+server.ts`

### Option 2: Mailchimp

Replace ConvertKit code with Mailchimp API calls:

```typescript
const response = await fetch(
  `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
  {
    method: 'POST',
    headers: {
      Authorization: `apikey ${MAILCHIMP_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed'
    })
  }
);
```

## Deployment

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Configure environment variables in project settings
5. Deploy

**Automatic deployment on every push to main branch**

Custom domain setup:
- Add `pilgrimage.love` in Vercel dashboard
- Update DNS records at your registrar:
  - Type: `A`, Name: `@`, Value: `76.76.21.21`
  - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`

### Option 2: Cloudflare Pages

1. Change adapter in `svelte.config.js`:
   ```javascript
   import adapter from '@sveltejs/adapter-cloudflare';

   export default {
     kit: {
       adapter: adapter()
     }
   };
   ```

2. Push to GitHub
3. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
4. Create new Pages project
5. Connect repository
6. Configure environment variables
7. Deploy

## Development

### Running the Dev Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Key Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code (if configured)
npm run format       # Format code (if configured)
```

### Component Usage

**VideoEmbed** - Embed YouTube or Vimeo videos:
```svelte
<VideoEmbed
  url="https://www.youtube.com/watch?v=VIDEO_ID"
  title="Video Title"
  autoplay={false}
/>
```

**DonationProgress** - Show funding progress:
```svelte
<DonationProgress />
```

**CharacterCards** - Display character grid:
```svelte
<CharacterCards />
```

**EmailSignup** - Newsletter signup:
```svelte
<EmailSignup />
```

## Design System

### Colors

Custom Tailwind colors defined in `tailwind.config.js`:

- **sacred-earth**: Terracotta/desert tones (50-950)
- **ganges-blue**: Deep blues and teals (50-950)
- **temple-white**: Clean whites and ivories (50-950)
- **saffron**: Accent orange/gold (50-950)

**Usage**:
```html
<div class="bg-sacred-earth-100 text-ganges-blue-900">
  <button class="bg-saffron-600 hover:bg-saffron-700">Donate</button>
</div>
```

### Typography

- **Headings**: Crimson Pro (serif) - `font-serif`
- **Body**: Inter (sans-serif) - `font-sans`

**Usage**:
```html
<h1 class="font-serif text-4xl">The Pilgrimage</h1>
<p class="font-sans text-base">Body text here</p>
```

### Spacing

Custom utility classes in `app.css`:

- `.section-spacing`: Vertical padding for sections (py-16 md:py-24)
- `.container-custom`: Max-width container with padding
- `.gradient-sacred`: Sacred color gradient background

## Updating Content

### Update Fundraising Progress

Edit `src/lib/config/site.ts`:

```typescript
fundraising: {
  goal: 10000,
  raised: 5432,  // Update this number as donations come in
  currency: "USD"
}
```

The progress bar will automatically update across all pages.

### Add/Edit Characters

Edit `src/lib/config/site.ts`:

```typescript
characters: [
  {
    id: "new-character",  // URL-friendly ID
    name: "Character Name",
    title: "Brief Title",
    bio: "Short bio for character card",
    fullBio: "Full biography for character page",
    quote: "Optional inspiring quote",
    image: "/images/characters/photo.jpg",
    country: "Country of Origin"
  }
]
```

### Update Videos

Replace video URLs in `src/lib/config/site.ts`:

```typescript
videos: {
  trailer3min: {
    url: "https://www.youtube.com/watch?v=YOUR_ID",
    title: "The Pilgrimage - 3 Minute Trailer"
  },
  trailer1min: {
    url: "https://vimeo.com/YOUR_ID",
    title: "The Pilgrimage - 1 Minute Trailer"
  }
}
```

Both YouTube and Vimeo URLs are supported.

## Troubleshooting

### Build Errors

**Error**: `Cannot find module '@sveltejs/adapter-vercel'`
**Fix**: Install the adapter: `npm install -D @sveltejs/adapter-vercel`

**Error**: `peer dependency warnings with svelte-french-toast`
**Fix**: Install with `npm install --legacy-peer-deps`

### Stripe Not Working

1. Check `.env` file has correct keys
2. Verify code is uncommented in `/src/routes/api/stripe/checkout/+server.ts`
3. Test with Stripe test card: `4242 4242 4242 4242`
4. Check Stripe dashboard for errors

### Email Signup Not Working

1. Verify EMAIL_API_KEY in `.env`
2. Check code is uncommented in `/src/routes/api/email/subscribe/+server.ts`
3. Test API key with Postman or curl
4. Check email service dashboard for errors

### Images Not Loading

1. Ensure images are in `static/` directory
2. Use paths relative to `static/` (e.g., `/images/photo.jpg`, not `/static/images/photo.jpg`)
3. Check image file names match exactly (case-sensitive)
4. Verify image formats are supported (jpg, png, webp, svg)

### Videos Not Embedding

1. Check video URL format in `site.ts`
2. Ensure videos are set to "Public" or "Unlisted" (not Private)
3. Test embed URL directly in browser
4. Vimeo videos may require Pro account for certain features

## Performance Optimization

### Images

- Use WebP format when possible
- Compress images before uploading (use TinyPNG or similar)
- Keep hero images under 500KB
- Keep character photos under 200KB

### Videos

- Host on Vimeo Plus or YouTube for best streaming performance
- Use "lazy loading" (already implemented in VideoEmbed component)
- Consider showing poster image instead of autoplay on mobile

### Fonts

- Fonts are self-hosted via @fontsource (already configured)
- Only used weights are loaded (400, 600, 700)
- Font display: swap prevents layout shift

### Bundle Size

SvelteKit automatically:
- Code-splits by route
- Tree-shakes unused code
- Minifies production builds

Check bundle size: `npm run build` and review `/.svelte-kit/output/`

## Analytics

### Plausible Setup

1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain: `pilgrimage.love`
3. Add to `.env`:
   ```bash
   PUBLIC_PLAUSIBLE_DOMAIN=pilgrimage.love
   ```
4. Add script tag to `src/app.html`:
   ```html
   <script defer data-domain="pilgrimage.love" src="https://plausible.io/js/script.js"></script>
   ```

Privacy-focused, no cookies, GDPR compliant.

## Contributing

This is a private project for The Pilgrimage documentary. For questions or support:

- Email: [your-email]
- Website: [pilgrimage.love](https://pilgrimage.love)

## License

All content and code © The Pilgrimage Documentary. All rights reserved.

---

**Built with SvelteKit + Vite • Optimized for Performance • Sacred by Design**
