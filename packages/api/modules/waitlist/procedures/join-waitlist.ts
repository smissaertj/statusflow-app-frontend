import { ORPCError } from "@orpc/client";
import { logger } from "@repo/logs";
import { sendEmail } from "@repo/mail";
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
			email: z.string().email(),
		}),
	)
	.use(localeMiddleware)
	.handler(async ({ input, context: { locale } }) => {
		const { email } = input;

		try {
			await sendEmail({
				to: email,
				locale,
				templateId: "waitlistSignup",
				context: {},
			});
		} catch (error) {
			logger.error(error);
			throw new ORPCError("INTERNAL_SERVER_ERROR");
		}
	});
