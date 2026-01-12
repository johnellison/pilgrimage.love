import { Resend } from 'resend';

const resendClient = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL = process.env.FROM_EMAIL || 'The Pilgrimage <hello@pilgrimage.love>';

interface EmailPayload {
	from: string;
	to: string;
	subject: string;
	text?: string;
	html: string;
	tags?: Array<{ name: string; value: string }>;
	headers?: Record<string, string>;
}

interface EmailResult {
	data: { id: string } | null;
	error: { message: string; name: string } | null;
}

export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
	try {
		const { data, error } = await resendClient.emails.send({
			from: payload.from,
			to: payload.to,
			subject: payload.subject,
			html: payload.html,
			text: payload.text,
			tags: payload.tags,
			headers: payload.headers
		});

		if (error) {
			return {
				data: null,
				error: { message: error.message, name: error.name }
			};
		}

		return {
			data: data ? { id: data.id } : null,
			error: null
		};
	} catch (e) {
		const error = e as Error;
		return {
			data: null,
			error: { message: error.message, name: 'sdk_error' }
		};
	}
}

export const resend = resendClient;
