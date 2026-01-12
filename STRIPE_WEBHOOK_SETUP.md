# Stripe Webhook Setup Guide

This guide walks you through setting up Stripe webhooks for The Pilgrimage donation system.

## What are Webhooks?

Webhooks allow Stripe to notify your application when important events happen (like successful payments, failed charges, or subscription changes). This ensures you can update your records and send confirmation emails.

---

## Setup Steps

### 1. Get Your Webhook Endpoint URL

Your webhook endpoint will be:

**Development (local testing)**:
```
http://localhost:5173/api/stripe/webhook
```

**Production (after deployment)**:
```
https://pilgrimage.love/api/stripe/webhook
```

---

### 2. Create Webhook in Stripe Dashboard

#### For Test Mode (Development):

1. Go to [Stripe Dashboard - Developers](https://dashboard.stripe.com/test/webhooks)
2. Click **"Add endpoint"**
3. Enter endpoint URL: `http://localhost:5173/api/stripe/webhook`
   - **Note**: For local testing, you'll need to use Stripe CLI (see section below)
4. Click **"Select events"**
5. Select these events (recommended for donations):
   - `checkout.session.completed` - Payment succeeded
   - `checkout.session.async_payment_succeeded` - Async payment succeeded
   - `checkout.session.async_payment_failed` - Payment failed
   - `customer.subscription.created` - Recurring donation started
   - `customer.subscription.updated` - Subscription changed
   - `customer.subscription.deleted` - Subscription cancelled
   - `invoice.paid` - Recurring payment succeeded
   - `invoice.payment_failed` - Recurring payment failed
6. Click **"Add endpoint"**
7. **Copy the "Signing secret"** (starts with `whsec_...`)
8. Add to your `.env` file:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_your_test_secret_here
   ```

#### For Live Mode (Production):

1. Go to [Stripe Dashboard - Live Mode Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. Enter endpoint URL: `https://pilgrimage.love/api/stripe/webhook`
4. Select the same events as above
5. Click **"Add endpoint"**
6. **Copy the "Signing secret"**
7. Add to your production environment variables (Vercel/Cloudflare dashboard)

---

### 3. Test Webhooks Locally with Stripe CLI

For local development, Stripe CLI forwards webhook events to your localhost.

#### Install Stripe CLI:

**macOS**:
```bash
brew install stripe/stripe-cli/stripe
```

**Linux**:
```bash
# Download from https://github.com/stripe/stripe-cli/releases
```

**Windows**:
```bash
# Download from https://github.com/stripe/stripe-cli/releases
```

#### Login to Stripe:
```bash
stripe login
```

#### Forward Webhooks to Local Server:
```bash
# Start your dev server first
npm run dev

# In another terminal, forward webhooks
stripe listen --forward-to localhost:5173/api/stripe/webhook
```

This command will output a webhook signing secret (starts with `whsec_`). Add it to your `.env`:
```bash
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### Test a Payment:
```bash
# Trigger a test checkout.session.completed event
stripe trigger checkout.session.completed
```

You should see the webhook event logged in your terminal.

---

## 4. Create the Webhook Handler

The webhook endpoint is already structured in `/src/routes/api/stripe/webhook/+server.ts`.

Create this file:

```typescript
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { sendEmail, FROM_EMAIL } from '$lib/resend';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2024-12-18.acacia'
});

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.text();
	const signature = request.headers.get('stripe-signature');

	if (!signature) {
		return json({ error: 'No signature' }, { status: 400 });
	}

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			STRIPE_WEBHOOK_SECRET
		);
	} catch (err) {
		console.error('Webhook signature verification failed:', err);
		return json({ error: 'Invalid signature' }, { status: 400 });
	}

	// Handle the event
	switch (event.type) {
		case 'checkout.session.completed':
			const session = event.data.object as Stripe.Checkout.Session;
			await handleSuccessfulPayment(session);
			break;

		case 'customer.subscription.created':
			const subscription = event.data.object as Stripe.Subscription;
			console.log('Subscription created:', subscription.id);
			// Handle new recurring donation
			break;

		case 'invoice.paid':
			const invoice = event.data.object as Stripe.Invoice;
			console.log('Invoice paid:', invoice.id);
			// Handle recurring payment success
			break;

		case 'invoice.payment_failed':
			const failedInvoice = event.data.object as Stripe.Invoice;
			console.log('Invoice payment failed:', failedInvoice.id);
			// Handle failed recurring payment
			break;

		default:
			console.log(`Unhandled event type: ${event.type}`);
	}

	return json({ received: true });
};

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
	const customerEmail = session.customer_details?.email;
	const amount = session.amount_total ? session.amount_total / 100 : 0;
	const isRecurring = session.mode === 'subscription';

	console.log('Payment successful:', {
		email: customerEmail,
		amount,
		isRecurring,
		sessionId: session.id
	});

	// Send thank you email
	if (customerEmail) {
		await sendEmail({
			from: FROM_EMAIL,
			to: customerEmail,
			subject: 'Thank you for supporting The Pilgrimage! 🙏',
			html: getDonationThankYouEmail(amount, isRecurring)
		});
	}

	// TODO: Update your database with donation record
	// TODO: Add donor to email list
	// TODO: Check if amount qualifies for film credits
}

function getDonationThankYouEmail(amount: number, isRecurring: boolean): string {
	return `
		<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
			<div style="text-align: center; margin-bottom: 32px;">
				<h1 style="color: #D97706; font-family: 'Georgia', serif; font-size: 32px; margin: 0;">
					The Pilgrimage
				</h1>
				<p style="color: #78716C; font-size: 18px; margin: 8px 0 0 0;">A Call to Life</p>
			</div>

			<div style="text-align: center; margin-bottom: 32px;">
				<div style="width: 80px; height: 80px; background: #D97706; border-radius: 50%; display: inline-flex; align-items: center; justify-center;">
					<span style="font-size: 40px; color: white;">✓</span>
				</div>
			</div>

			<h2 style="color: #0C4A6E; font-size: 28px; text-align: center; margin-bottom: 24px;">
				Thank You! 🙏
			</h2>

			<p style="line-height: 1.6; font-size: 16px;">
				Your ${isRecurring ? 'monthly' : ''} donation of <strong style="color: #D97706;">$${amount}</strong>
				has been received. You're helping bring The Pilgrimage to the world.
			</p>

			<div style="background: linear-gradient(135deg, rgba(217, 119, 6, 0.1) 0%, rgba(12, 74, 110, 0.1) 100%); border-left: 4px solid #D97706; padding: 20px; margin: 24px 0; border-radius: 0 8px 8px 0;">
				<p style="margin: 0 0 12px 0; font-weight: 600; color: #D97706;">
					What happens next:
				</p>
				<ul style="margin: 0; padding-left: 20px;">
					<li style="margin: 8px 0;">You'll receive an email receipt shortly</li>
					${amount >= 25 ? '<li style="margin: 8px 0;">Your name will be added to the film credits</li>' : ''}
					<li style="margin: 8px 0;">You'll receive exclusive updates on post-production progress</li>
					<li style="margin: 8px 0;">33% of profits will support the wisdom keepers featured in the film</li>
				</ul>
			</div>

			${isRecurring ? `
			<p style="line-height: 1.6; font-size: 14px; color: #666; margin-top: 24px;">
				Your monthly donation will automatically renew. You can cancel anytime from your Stripe customer portal.
			</p>
			` : ''}

			<div style="text-align: center; margin: 32px 0;">
				<a href="https://pilgrimage.love" style="display: inline-block; background: #D97706; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">
					Visit Our Website
				</a>
			</div>

			<p style="margin-top: 32px;">
				With deep gratitude,<br />
				<strong>John Dass & The Pilgrimage Team</strong>
			</p>

			<hr style="border: none; border-top: 1px solid #e5e5e5; margin: 40px 0;" />

			<p style="font-size: 12px; color: #999; text-align: center;">
				Transaction ID: ${Date.now()}<br />
				<a href="https://pilgrimage.love" style="color: #D97706;">The Pilgrimage</a> • A Call to Life
			</p>
		</div>
	`;
}
```

---

## 5. Security Best Practices

### ✅ DO:
- **Always verify webhook signatures** - The code above does this automatically
- **Use HTTPS in production** - Required for security
- **Store webhook secret in environment variables** - Never commit to git
- **Log webhook events** - For debugging and auditing
- **Return 200 status quickly** - Process long-running tasks asynchronously
- **Handle idempotency** - Stripe may send the same event multiple times

### ❌ DON'T:
- Don't trust webhook data without signature verification
- Don't hardcode secrets in your code
- Don't perform heavy processing in the webhook handler
- Don't expose webhook endpoint without security

---

## 6. Testing Checklist

### One-Time Donations:
- [ ] Test with card `4242 4242 4242 4242` (success)
- [ ] Verify webhook receives `checkout.session.completed`
- [ ] Check thank you email is sent
- [ ] Verify success page redirect works
- [ ] Test with card `4000 0000 0000 0002` (decline)

### Recurring Donations:
- [ ] Create monthly subscription
- [ ] Verify `customer.subscription.created` event
- [ ] Check thank you email mentions recurring
- [ ] Test subscription cancellation
- [ ] Verify `customer.subscription.deleted` event

### Production Testing:
- [ ] Deploy to production
- [ ] Update webhook URL to production domain
- [ ] Test with Stripe live mode
- [ ] Monitor webhook logs in Stripe dashboard
- [ ] Verify emails are delivered

---

## 7. Monitoring & Debugging

### View Webhook Logs:
- **Test mode**: https://dashboard.stripe.com/test/webhooks
- **Live mode**: https://dashboard.stripe.com/webhooks

### Common Issues:

**Webhook fails with signature error**:
- Check `STRIPE_WEBHOOK_SECRET` is correct
- Ensure you're using the raw request body (not parsed JSON)
- Verify endpoint URL matches Stripe dashboard

**Webhook times out**:
- Move long-running tasks (emails, database) to background jobs
- Return 200 status immediately after verification

**Duplicate events**:
- Implement idempotency checks using `event.id`
- Store processed event IDs to prevent duplicates

---

## 8. Going Live

Before accepting real donations:

1. **Switch to live Stripe keys**:
   - Update `STRIPE_SECRET_KEY` with `sk_live_...`
   - Update `PUBLIC_STRIPE_PUBLIC_KEY` with `pk_live_...`

2. **Create live webhook**:
   - Add production webhook at https://dashboard.stripe.com/webhooks
   - Use production URL: `https://pilgrimage.love/api/stripe/webhook`
   - Update `STRIPE_WEBHOOK_SECRET` with live secret

3. **Test in live mode**:
   - Make a $1 donation to test end-to-end
   - Verify webhook fires and email sends
   - Refund test donation if needed

4. **Monitor regularly**:
   - Check Stripe dashboard for failed webhooks
   - Review error logs
   - Test monthly to ensure everything works

---

## Quick Reference

### Webhook Endpoint:
```
POST /api/stripe/webhook
```

### Key Events:
- `checkout.session.completed` - One-time payment succeeded
- `customer.subscription.created` - Recurring donation started
- `invoice.paid` - Monthly payment succeeded
- `invoice.payment_failed` - Payment failed

### Environment Variables:
```bash
STRIPE_SECRET_KEY=sk_test_...
PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Stripe CLI Commands:
```bash
stripe login
stripe listen --forward-to localhost:5173/api/stripe/webhook
stripe trigger checkout.session.completed
```

---

## Support

- **Stripe Documentation**: https://stripe.com/docs/webhooks
- **Stripe CLI**: https://stripe.com/docs/stripe-cli
- **Test Cards**: https://stripe.com/docs/testing#cards

---

**Last updated**: January 12, 2026
