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
	try {
		switch (event.type) {
			case 'checkout.session.completed':
				const session = event.data.object as Stripe.Checkout.Session;
				await handleSuccessfulPayment(session);
				break;

			case 'customer.subscription.created':
				const subscription = event.data.object as Stripe.Subscription;
				console.log('Subscription created:', subscription.id);
				break;

			case 'invoice.paid':
				const invoice = event.data.object as Stripe.Invoice;
				console.log('Invoice paid:', invoice.id);
				await handleRecurringPayment(invoice);
				break;

			case 'invoice.payment_failed':
				const failedInvoice = event.data.object as Stripe.Invoice;
				console.log('Invoice payment failed:', failedInvoice.id);
				await handleFailedPayment(failedInvoice);
				break;

			case 'customer.subscription.deleted':
				const deletedSub = event.data.object as Stripe.Subscription;
				console.log('Subscription cancelled:', deletedSub.id);
				break;

			default:
				console.log(\`Unhandled event type: \${event.type}\`);
		}
	} catch (err) {
		console.error('Error handling webhook event:', err);
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

	if (customerEmail) {
		const { error } = await sendEmail({
			from: FROM_EMAIL,
			to: customerEmail,
			subject: 'Thank you for supporting The Pilgrimage! 🙏',
			html: getDonationThankYouEmail(amount, isRecurring, session.id)
		});

		if (error) {
			console.error('Failed to send thank you email:', error);
		} else {
			console.log('Thank you email sent to:', customerEmail);
		}
	}
}

async function handleRecurringPayment(invoice: Stripe.Invoice) {
	const customerEmail = invoice.customer_email;
	const amount = invoice.amount_paid ? invoice.amount_paid / 100 : 0;

	if (customerEmail) {
		await sendEmail({
			from: FROM_EMAIL,
			to: customerEmail,
			subject: 'Your monthly donation to The Pilgrimage',
			html: getRecurringPaymentEmail(amount)
		});
	}
}

async function handleFailedPayment(invoice: Stripe.Invoice) {
	const customerEmail = invoice.customer_email;

	if (customerEmail) {
		await sendEmail({
			from: FROM_EMAIL,
			to: customerEmail,
			subject: 'Payment failed - The Pilgrimage',
			html: getFailedPaymentEmail()
		});
	}
}

function getDonationThankYouEmail(amount: number, isRecurring: boolean, sessionId: string): string {
	const recurringText = isRecurring ? 'monthly ' : '';
	const creditsText = amount >= 25 ? '<li style="margin: 8px 0;">Your name will be added to the film credits</li>' : '';
	const managementText = isRecurring ? \`<p style="line-height: 1.6; font-size: 14px; color: #666; margin-top: 24px;">Your monthly donation will automatically renew. You can manage or cancel your subscription anytime through the Stripe customer portal link in your Stripe receipt email.</p>\` : '';

	return \`<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><div style="text-align: center; margin-bottom: 32px;"><h1 style="color: #D97706; font-family: 'Georgia', serif; font-size: 32px; margin: 0;">The Pilgrimage</h1><p style="color: #78716C; font-size: 18px; margin: 8px 0 0 0;">A Call to Life</p></div><div style="text-align: center; margin-bottom: 32px;"><div style="width: 80px; height: 80px; background: #D97706; border-radius: 50%; display: inline-flex; align-items: center; justify-center;"><span style="font-size: 40px; color: white;">✓</span></div></div><h2 style="color: #0C4A6E; font-size: 28px; text-align: center; margin-bottom: 24px;">Thank You! 🙏</h2><p style="line-height: 1.6; font-size: 16px;">Your \${recurringText}donation of <strong style="color: #D97706;">$\${amount}</strong> has been received. You're helping bring The Pilgrimage to the world.</p><div style="background: linear-gradient(135deg, rgba(217, 119, 6, 0.1) 0%, rgba(12, 74, 110, 0.1) 100%); border-left: 4px solid #D97706; padding: 20px; margin: 24px 0; border-radius: 0 8px 8px 0;"><p style="margin: 0 0 12px 0; font-weight: 600; color: #D97706;">What happens next:</p><ul style="margin: 0; padding-left: 20px;"><li style="margin: 8px 0;">You'll receive an email receipt from Stripe shortly</li>\${creditsText}<li style="margin: 8px 0;">You'll receive exclusive updates on post-production progress</li><li style="margin: 8px 0;">33% of profits will support the wisdom keepers featured in the film</li></ul></div>\${managementText}<div style="text-align: center; margin: 32px 0;"><a href="https://pilgrimage.love/characters" style="display: inline-block; background: #D97706; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">Meet the Pilgrims</a></div><p style="margin-top: 32px;">With deep gratitude,<br /><strong>John Dass & The Pilgrimage Team</strong></p><hr style="border: none; border-top: 1px solid #e5e5e5; margin: 40px 0;" /><p style="font-size: 12px; color: #999; text-align: center;">Transaction ID: \${sessionId}<br /><a href="https://pilgrimage.love" style="color: #D97706;">pilgrimage.love</a> • A Call to Life</p></div>\`;
}

function getRecurringPaymentEmail(amount: number): string {
	return \`<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><div style="text-align: center; margin-bottom: 32px;"><h1 style="color: #D97706; font-family: 'Georgia', serif; font-size: 32px; margin: 0;">The Pilgrimage</h1><p style="color: #78716C; font-size: 18px; margin: 8px 0 0 0;">A Call to Life</p></div><h2 style="color: #0C4A6E; font-size: 24px;">Thank you for your continued support 🙏</h2><p style="line-height: 1.6; font-size: 16px;">Your monthly donation of <strong style="color: #D97706;">$\${amount}</strong> has been processed.</p><p style="line-height: 1.6;">Your ongoing support is helping us complete post-production and bring this powerful story of unity and healing to audiences around the world.</p><div style="text-align: center; margin: 32px 0;"><a href="https://pilgrimage.love" style="display: inline-block; background: #D97706; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">View Latest Updates</a></div><p style="margin-top: 32px;">With gratitude,<br /><strong>The Pilgrimage Team</strong></p><hr style="border: none; border-top: 1px solid #e5e5e5; margin: 40px 0;" /><p style="font-size: 12px; color: #999; text-align: center;">To manage or cancel your subscription, use the customer portal link in your Stripe receipt email.<br /><a href="https://pilgrimage.love" style="color: #D97706;">pilgrimage.love</a></p></div>\`;
}

function getFailedPaymentEmail(): string {
	return \`<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><div style="text-align: center; margin-bottom: 32px;"><h1 style="color: #D97706; font-family: 'Georgia', serif; font-size: 32px; margin: 0;">The Pilgrimage</h1><p style="color: #78716C; font-size: 18px; margin: 8px 0 0 0;">A Call to Life</p></div><h2 style="color: #DC2626; font-size: 24px;">Payment Failed</h2><p style="line-height: 1.6; font-size: 16px;">We were unable to process your monthly donation. This usually happens when:</p><ul style="line-height: 1.6;"><li>Your card has expired</li><li>Your card has insufficient funds</li><li>Your bank declined the charge</li></ul><p style="line-height: 1.6;">Please update your payment method to continue supporting The Pilgrimage.</p><div style="text-align: center; margin: 32px 0;"><a href="https://billing.stripe.com/p/login" style="display: inline-block; background: #D97706; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">Update Payment Method</a></div><p style="line-height: 1.6; font-size: 14px; color: #666;">If you have any questions or need assistance, please reply to this email.</p><p style="margin-top: 32px;">The Pilgrimage Team</p><hr style="border: none; border-top: 1px solid #e5e5e5; margin: 40px 0;" /><p style="font-size: 12px; color: #999; text-align: center;"><a href="https://pilgrimage.love" style="color: #D97706;">pilgrimage.love</a></p></div>\`;
}
