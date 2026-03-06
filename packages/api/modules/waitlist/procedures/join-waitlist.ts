import { ORPCError } from "@orpc/client";
import { logger } from "@repo/logs";
import { addContactToAudience, sendEmail } from "@repo/mail";
import { verifyTurnstileToken } from "../../../lib/turnstile";
import { localeMiddleware } from "../../../orpc/middleware/locale-middleware";
import { publicProcedure } from "../../../orpc/procedures";
import { waitlistSubmissionSchema } from "../types";

export const joinWaitlist = publicProcedure
	.route({
		method: "POST",
		path: "/waitlist",
		tags: ["Waitlist"],
		summary: "Join the waiting list",
	})
	.input(waitlistSubmissionSchema)
	.use(localeMiddleware)
	.handler(async ({ input, context: { headers, locale } }) => {
		const { email, firstName, lastName, turnstileToken } = input;

		try {
			await verifyTurnstileToken({
				action: "waitlist_form",
				headers,
				token: turnstileToken,
			});

			const audienceId = process.env.RESEND_AUDIENCE_ID;
			if (audienceId) {
				await addContactToAudience({
					email,
					firstName,
					lastName,
					audienceId,
				});
			}

			await sendEmail({
				to: email,
				locale,
				templateId: "waitlistSignup",
				context: { firstName },
			});
		} catch (error) {
			logger.error(error);
			throw new ORPCError("INTERNAL_SERVER_ERROR");
		}
	});
