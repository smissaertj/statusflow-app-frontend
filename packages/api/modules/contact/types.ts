import { z } from "zod";

export const contactFormSchema = z.object({
	email: z.string().email(),
	name: z.string().min(3),
	message: z.string().min(10),
});

export const contactFormSubmissionSchema = contactFormSchema.extend({
	turnstileToken: z.string().min(1),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactFormSubmissionValues = z.infer<
	typeof contactFormSubmissionSchema
>;
