export const config = {
	contactFormTo: process.env.CONTACT_FORM_TO_MAIL as string,
	turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY as string | undefined,
} as const;
