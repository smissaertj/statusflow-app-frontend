import { ORPCError } from "@orpc/client";
import { logger } from "@repo/logs";
import { sendEmail } from "@repo/mail";
import { config } from "../../../config";
import { verifyTurnstileToken } from "../../../lib/turnstile";
import { localeMiddleware } from "../../../orpc/middleware/locale-middleware";
import { publicProcedure } from "../../../orpc/procedures";
import { contactFormSubmissionSchema } from "../types";

export const submitContactForm = publicProcedure
	.route({
		method: "POST",
		path: "/contact",
		tags: ["Contact"],
		summary: "Submit contact form",
	})
	.input(contactFormSubmissionSchema)
	.use(localeMiddleware)
	.handler(
		async ({
			input: { email, message, name, turnstileToken },
			context: { headers, locale },
		}) => {
			try {
				await verifyTurnstileToken({
					action: "contact_form",
					headers,
					token: turnstileToken,
				});

				await sendEmail({
					to: config.contactFormTo,
					locale,
					subject: "Contact Form Submission",
					text: `Name: ${name}\n\nEmail: ${email}\n\nMessage: ${message}`,
				});
			} catch (error) {
				logger.error(error);
				throw new ORPCError("INTERNAL_SERVER_ERROR");
			}
		},
	);
