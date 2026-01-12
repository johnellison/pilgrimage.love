import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import { PUBLIC_SITE_URL } from '$env/static/public';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { amount, recurring } = await request.json();

		if (!amount || amount < 100) { // Minimum $1.00
			return json({ message: 'Invalid donation amount' }, { status: 400 });
		}

		const stripe = new Stripe(STRIPE_SECRET_KEY, {
			apiVersion: '2025-12-15.clover',
		});

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: 'Support The Pilgrimage',
							description: recurring
								? 'Monthly donation to The Pilgrimage documentary'
								: 'One-time donation to The Pilgrimage documentary',
							images: [`${PUBLIC_SITE_URL}/images/og-image.jpg`],
						},
						unit_amount: amount,
						...(recurring && {
							recurring: {
								interval: 'month',
							},
						}),
					},
					quantity: 1,
				},
			],
			mode: recurring ? 'subscription' : 'payment',
			success_url: `${PUBLIC_SITE_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${PUBLIC_SITE_URL}/donate`,
			metadata: {
				amount: amount.toString(),
				recurring: recurring.toString(),
			},
		});

		return json({ url: session.url });

	} catch (error) {
		console.error('Stripe checkout error:', error);
		return json(
			{ message: 'Failed to create checkout session. Please try again.' },
			{ status: 500 }
		);
	}
};
