"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "@repo/api/modules/contact/types";
import { Alert, AlertTitle } from "@repo/ui/components/alert";
import { Button } from "@repo/ui/components/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import { TurnstileField } from "@shared/components/TurnstileField";
import { orpc } from "@shared/lib/orpc-query-utils";
import { useMutation } from "@tanstack/react-query";
import { MailCheckIcon, MailIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function ContactForm() {
	const t = useTranslations();
	const contactFormMutation = useMutation(
		orpc.contact.submit.mutationOptions(),
	);
	const [hasStartedTyping, setHasStartedTyping] = useState(false);
	const [turnstileResetKey, setTurnstileResetKey] = useState(0);
	const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

	const form = useForm({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});

	const formValues = form.watch();

	useEffect(() => {
		if (
			!hasStartedTyping &&
			Object.values(formValues).some((value) => value.trim().length > 0)
		) {
			setHasStartedTyping(true);
		}
	}, [formValues, hasStartedTyping]);

	const onSubmit = form.handleSubmit(async (values) => {
		if (!turnstileToken) {
			form.setError("root", {
				message: "Please complete the human verification.",
			});
			return;
		}

		try {
			form.clearErrors("root");
			await contactFormMutation.mutateAsync({
				...values,
				turnstileToken,
			});
		} catch {
			setTurnstileToken(null);
			setTurnstileResetKey((currentKey) => currentKey + 1);
			form.setError("root", {
				message: t("contact.form.notifications.error"),
			});
		}
	});

	return (
		<div>
			{form.formState.isSubmitSuccessful ? (
				<Alert variant="success">
					<MailCheckIcon />
					<AlertTitle>
						{t("contact.form.notifications.success")}
					</AlertTitle>
				</Alert>
			) : (
				<Form {...form}>
					<form
						onSubmit={onSubmit}
						className="flex flex-col items-stretch gap-6"
					>
						{form.formState.errors.root?.message && (
							<Alert variant="error">
								<MailIcon />
								<AlertTitle>
									{form.formState.errors.root.message}
								</AlertTitle>
							</Alert>
						)}

						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("contact.form.name")}
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("contact.form.email")}
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("contact.form.message")}
									</FormLabel>
									<FormControl>
										<Textarea {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full"
							disabled={hasStartedTyping && !turnstileToken}
							variant="primary"
							loading={form.formState.isSubmitting}
						>
							{t("contact.form.submit")}
						</Button>

						<TurnstileField
							key={turnstileResetKey}
							className="mt-4 flex justify-center"
							action="contact_form"
							enabled={hasStartedTyping}
							onTokenChange={(token) => {
								setTurnstileToken(token);
								if (token) {
									form.clearErrors("root");
								}
							}}
						/>
					</form>
				</Form>
			)}
		</div>
	);
}
