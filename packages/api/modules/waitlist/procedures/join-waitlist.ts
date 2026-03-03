import { ORPCError } from "@orpc/client";
import { logger } from "@repo/logs";
import { addContactToAudience, sendEmail } from "@repo/mail";
import { z } from "zod";
import { localeMiddleware } from "../../../orpc/middleware/locale-middleware";
import { publicProcedure } from "../../../orpc/procedures";

export const joinWaitlist = publicProcedure
	.route({
		method: "POST",
		path: "/waitlist",
		tags: ["Waitlist"],
		summary: "Join the waiting list",
	})
	.input(
		z.object({
			firstName: z.string().min(1),
			lastName: z.string().min(1),
			email: z.string().email(),
		}),
	)
	.use(localeMiddleware)
	.handler(async ({ input, context: { locale } }) => {
		const { firstName, lastName, email } = input;

		try {
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
