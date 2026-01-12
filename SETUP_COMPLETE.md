# Setup Complete - Next Steps

## ✅ What's Been Done

### 1. Video URL Added
- 3-minute YouTube trailer: https://www.youtube.com/watch?v=SaXCou56Tyw
- Updated in `src/lib/config/site.ts`

### 2. Resend Email Integration
- Created `src/lib/resend.ts` - Resend client wrapper
- Updated `src/routes/api/email/subscribe/+server.ts` - Email subscription with welcome email
- Installed `resend` package
- Updated `.env.example` with Resend variables

### 3. Stripe Webhook Setup
- Created `STRIPE_WEBHOOK_SETUP.md` - Complete webhook setup guide
- Webhook endpoint at `/api/stripe/webhook` (created by Gemini Flash 3)
- Includes email notifications for donations, recurring payments, and failures

### 4. Dependencies Installed
- All npm packages installed with `--legacy-peer-deps` flag
- Resend SDK added

---

## 🔧 What You Need to Do Now

### 1. Create `.env` File

```bash
cp .env.example .env
```

Then fill in these values:

```bash
# Stripe (from https://dashboard.stripe.com/apikeys)
PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...  # You'll get this when setting up webhook

# Resend (from https://resend.com/api-keys)
RESEND_API_KEY=re_...
FROM_EMAIL=The Pilgrimage <hello@pilgrimage.love>

# Crypto Wallets
PUBLIC_CRYPTO_WALLET_ETH=0x...
PUBLIC_CRYPTO_WALLET_BTC=bc1...

# Site Config
PUBLIC_SITE_URL=http://localhost:5173  # Change to https://pilgrimage.love in production
```

### 2. Set Up Resend

1. Go to https://resend.com/signup
2. Create account (free tier: 100 emails/day, 3,000/month)
3. Verify your domain or use `onboarding@resend.dev` for testing
4. Get API key from https://resend.com/api-keys
5. Add to `.env`:
   ```bash
   RESEND_API_KEY=re_your_key_here
   ```

**Important**: For production, you MUST verify your domain `pilgrimage.love`:
- Add DNS records in Resend dashboard
- This allows you to send from `hello@pilgrimage.love`

### 3. Set Up Stripe

#### Get API Keys:
1. Go to https://dashboard.stripe.com/register
2. Create account
3. Get test keys from https://dashboard.stripe.com/test/apikeys
4. Add to `.env`

#### Uncomment Stripe Code:
Edit `src/routes/api/stripe/checkout/+server.ts` and **uncomment the Stripe session creation code** (around lines 12-39).

#### Set Up Webhook:
Follow instructions in `STRIPE_WEBHOOK_SETUP.md`:

For local testing:
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks (in separate terminal while dev server runs)
stripe listen --forward-to localhost:5173/api/stripe/webhook
```

Copy the webhook secret from the CLI output and add to `.env`.

### 4. Upload Images

Place these files in `static/images/`:

```
static/
├── images/
│   ├── characters/
│   │   ├── siriani.jpg
│   │   ├── yonatan.jpg
│   │   ├── john-fatima.jpg
│   │   ├── swami-ogi.jpg
│   │   ├── luke.jpg
│   │   └── guruji.jpg
│   └── og-image.jpg  (1200x630px for social sharing)
└── logos/
    └── amazigh-symbol.svg
```

**Image requirements**:
- Character photos: 600x800px recommended, under 200KB each
- Use JPG format, compress with TinyPNG
- OG image: Exactly 1200x630px

---

## 🧪 Testing

### Start Dev Server:
```bash
npm run dev
```

Visit http://localhost:5173

### Test Email Signup:
1. Go to home page
2. Scroll to email signup section
3. Enter your email
4. Check your inbox for welcome email

**Note**: If using `onboarding@resend.dev` sender for testing, Resend will show email in logs but won't actually deliver.

### Test Stripe Donation (requires setup):
1. Go to `/donate`
2. Select amount ($25 recommended to test credits tier)
3. Use test card: `4242 4242 4242 4242`
4. Any future date, any CVC
5. Should redirect to `/donate/success`
6. Check webhook fires (if Stripe CLI running)
7. Check thank you email sent

### Test Recurring Donation:
1. Same as above but check "Make this monthly"
2. Verify subscription created in Stripe dashboard
3. Check thank you email mentions monthly

---

## 🚀 Production Deployment

### Before Deploying:

1. **Switch to live Stripe keys** in production environment
2. **Verify Resend domain** for pilgrimage.love
3. **Upload all images** to `static/`
4. **Test locally** - everything should work on localhost first

### Deploy to Vercel:

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit - The Pilgrimage website"
git remote add origin https://github.com/yourusername/pilgrimage.love.git
git push -u origin master

# 2. Deploy on Vercel
# - Go to https://vercel.com
# - Import your GitHub repository
# - Add environment variables from .env (except .env file itself)
# - Deploy
```

### Set Up Production Webhook:
1. After deployment, go to Stripe Dashboard
2. Create webhook for https://pilgrimage.love/api/stripe/webhook
3. Select same events as local webhook
4. Copy webhook secret
5. Add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`
6. Redeploy

### Domain Setup:
1. Add `pilgrimage.love` in Vercel dashboard
2. Update DNS records at your registrar:
   - Type: `A`, Name: `@`, Value: `76.76.21.21`
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`
3. Wait for DNS propagation (up to 48 hours, usually faster)

---

## 📝 Regular Updates

### Update Fundraising Progress:
Edit `src/lib/config/site.ts`:
```typescript
fundraising: {
  goal: 10000,
  raised: 5432,  // Update this number
  currency: "USD"
}
```

### Add More Character Bios:
Edit `src/lib/config/site.ts` and add to the `characters` array.

### Write Blog Posts (Phase 2):
Create files in `src/routes/blog/[slug]/+page.md` (MDsveX setup required).

---

## 🐛 Troubleshooting

### Dev server won't start:
```bash
rm -rf node_modules .svelte-kit
npm install --legacy-peer-deps
npm run dev
```

### Images not showing:
- Ensure images are in `static/images/` (not `src/images/`)
- Use paths like `/images/photo.jpg` in config

### Email not sending:
- Check `RESEND_API_KEY` in `.env`
- Verify sender email matches Resend verified domain
- Check Resend logs: https://resend.com/logs

### Stripe not working:
- Uncomment Stripe code in `checkout/+server.ts`
- Verify API keys in `.env`
- Use Stripe test cards: https://stripe.com/docs/testing

---

## 📚 Documentation

- **README.md** - Full development guide
- **IMPLEMENTATION_SUMMARY.md** - What's built and what you need to do
- **STRIPE_WEBHOOK_SETUP.md** - Complete Stripe webhook guide
- **This file (SETUP_COMPLETE.md)** - Quick reference for setup steps

---

## ✨ You're Ready to Launch!

Once you:
1. ✅ Add `.env` with Resend + Stripe keys
2. ✅ Upload images
3. ✅ Test locally
4. ✅ Deploy to Vercel

You'll have a fully functional fundraising website!

**Estimated time**: 2-3 hours to complete all setup steps.

---

_Last updated: January 12, 2026_
