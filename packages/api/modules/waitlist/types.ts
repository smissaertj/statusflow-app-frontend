import { z } from "zod";

export const waitlistFormSchema = z.object({
	email: z.string().email(),
	firstName: z.string().min(1),
	lastName: z.string().min(1),
});

export const waitlistSubmissionSchema = waitlistFormSchema.extend({
	turnstileToken: z.string().min(1),
});

export type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;
export type WaitlistSubmissionValues = z.infer<
	typeof waitlistSubmissionSchema
>;
