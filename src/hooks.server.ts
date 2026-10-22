// Runs once when the server starts, before any endpoint (Stripe, Resend) makes an outbound TLS call.
import { applyEmudhraTrustGuard } from '$lib/server/emudhra-trust-guard';

applyEmudhraTrustGuard();
