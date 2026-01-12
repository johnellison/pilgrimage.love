import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sendEmail, FROM_EMAIL } from '$lib/resend';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email, name } = await request.json();

		// Validate email
		if (!email || !email.includes('@')) {
			return json({ message: 'Invalid email address' }, { status: 400 });
		}

		const normalizedEmail = email.toLowerCase().trim();

		// Send welcome email via Resend
		const { data: emailData, error: emailError } = await sendEmail({
			from: FROM_EMAIL,
			to: normalizedEmail,
			subject: "Welcome to The Pilgrimage Community 🙏",
			html: getWelcomeEmailHtml(name)
		});

		if (emailError) {
			console.error('Resend error:', emailError);
			return json(
				{ message: 'Failed to send welcome email. Please try again.' },
				{ status: 500 }
			);
		}

		console.log('Welcome email sent:', emailData?.id);

		return json({
			success: true,
			message: 'Thanks for subscribing! Check your inbox for a welcome email.'
		});

	} catch (error) {
		console.error('Email subscription error:', error);
		return json(
			{ message: 'Failed to subscribe. Please try again later.' },
			{ status: 500 }
		);
	}
};

function getWelcomeEmailHtml(name?: string): string {
	return `
		<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
			<div style="text-align: center; margin-bottom: 32px;">
				<h1 style="color: #D97706; font-family: 'Georgia', serif; font-size: 32px; margin: 0;">
					The Pilgrimage
				</h1>
				<p style="color: #78716C; font-size: 18px; margin: 8px 0 0 0;">A Call to Life</p>
			</div>

			<h2 style="color: #0C4A6E; font-size: 24px;">Welcome to Our Journey 🙏</h2>

			<p>Hey${name ? ` ${name}` : ''} 👋</p>

			<p style="line-height: 1.6;">
				Thank you for joining us on this sacred journey. You're now part of a global community
				united by a shared vision: healing our planet and remembering our common humanity.
			</p>

			<div style="background: linear-gradient(135deg, rgba(217, 119, 6, 0.1) 0%, rgba(12, 74, 110, 0.1) 100%); border-left: 4px solid #D97706; padding: 20px; margin: 24px 0; border-radius: 0 8px 8px 0;">
				<p style="margin: 0 0 12px 0; font-weight: 600; color: #D97706;">
					What to expect:
				</p>
				<ul style="margin: 0; padding-left: 20px;">
					<li style="margin: 8px 0;">Updates on post-production progress</li>
					<li style="margin: 8px 0;">Exclusive behind-the-scenes content</li>
					<li style="margin: 8px 0;">Invitations to virtual screenings and events</li>
					<li style="margin: 8px 0;">Teachings and wisdom from the pilgrims</li>
					<li style="margin: 8px 0;">Early access to new episodes as we walk future pilgrimages</li>
				</ul>
			</div>

			<p style="line-height: 1.6;">
				Over 14 days in India, 27 pilgrims from 15 countries walked 854 kilometers through
				the Mahakumbh Mela—the largest gathering in human history. What emerged was a living
				prayer for the entire planet.
			</p>

			<div style="text-align: center; margin: 32px 0;">
				<a href="https://pilgrimage.love/donate" style="display: inline-block; background: #D97706; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">
					Support the Film
				</a>
			</div>

			<p style="line-height: 1.6;">
				33% of all profits support the wisdom keepers and indigenous communities featured in this film.
			</p>

			<p style="margin-top: 32px;">
				With gratitude,<br />
				<strong>John Dass & The Pilgrimage Team</strong>
			</p>

			<hr style="border: none; border-top: 1px solid #e5e5e5; margin: 40px 0;" />

			<p style="font-size: 12px; color: #999; text-align: center;">
				You're receiving this because you signed up for updates from The Pilgrimage.<br />
				<a href="https://pilgrimage.love" style="color: #D97706;">Visit our website</a>
			</p>
		</div>
	`;
}
