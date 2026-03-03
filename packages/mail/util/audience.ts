import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function addContactToAudience({
	email,
	firstName,
	lastName,
	audienceId,
}: {
	email: string;
	firstName?: string;
	lastName?: string;
	audienceId: string;
}) {
	return resend.contacts.create({
		audienceId,
		email,
		firstName,
		lastName,
		unsubscribed: false,
	});
}
