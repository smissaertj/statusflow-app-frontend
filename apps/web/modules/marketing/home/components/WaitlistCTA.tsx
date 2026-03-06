"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { waitlistFormSchema } from "@repo/api/modules/waitlist/types";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { orpc } from "@shared/lib/orpc-query-utils";
import { useMutation } from "@tanstack/react-query";
import { CheckCircleIcon, CircleAlertIcon, RocketIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TurnstileField } from "@shared/components/TurnstileField";

export function WaitlistCTA() {
	const t = useTranslations();
	const waitlistMutation = useMutation(orpc.waitlist.join.mutationOptions());
	const [hasStartedTyping, setHasStartedTyping] = useState(false);
	const [turnstileResetKey, setTurnstileResetKey] = useState(0);
	const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

	const form = useForm({
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
		},
		resolver: zodResolver(waitlistFormSchema),
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

	const onSubmit = form.handleSubmit(
		async ({ firstName, lastName, email }) => {
			if (!turnstileToken) {
				form.setError("root", {
					message: "Please complete the human verification.",
				});
				return;
			}

			try {
				form.clearErrors("root");
				await waitlistMutation.mutateAsync({
					firstName,
					lastName,
					email,
					turnstileToken,
				});
			} catch {
				setTurnstileToken(null);
				setTurnstileResetKey((currentKey) => currentKey + 1);
				form.setError("root", {
					message: t("waitlist.hints.error.message"),
				});
			}
		},
	);

	return (
		<section id="waitlist" className="py-12 lg:py-16 xl:py-24">
			<div className="container max-w-3xl">
				<div className="rounded-4xl bg-accent border border-primary p-6 lg:p-8">
					<div className="mb-8 text-center">
						<RocketIcon className="mx-auto mb-3 size-10 text-primary" />
						<h2 className="font-medium text-lg leading-tighter text-foreground md:text-xl lg:text-2xl xl:text-3xl">
							{t("waitlist.cta.title")}
						</h2>
						<p className="mt-2 text-foreground/60 text-sm sm:text-base">
							{t("waitlist.cta.subtitle")}
						</p>
					</div>

					<div className="mx-auto max-w-lg">
						{form.formState.isSubmitSuccessful ? (
							<Alert variant="success">
								<CheckCircleIcon />
								<AlertTitle>
									{t("waitlist.hints.success.title")}
								</AlertTitle>
								<AlertDescription>
									{t("waitlist.hints.success.message")}
								</AlertDescription>
							</Alert>
						) : (
							<form onSubmit={onSubmit}>
								{form.formState.errors.root?.message && (
									<Alert className="mb-4" variant="error">
										<CircleAlertIcon />
										<AlertTitle>
											{form.formState.errors.root.message}
										</AlertTitle>
									</Alert>
								)}

								<div className="mb-2 flex items-center gap-2">
									<Input
										type="text"
										required
										placeholder={t("waitlist.firstName")}
										{...form.register("firstName")}
									/>
									<Input
										type="text"
										required
										placeholder={t("waitlist.lastName")}
										{...form.register("lastName")}
									/>
								</div>
								<div className="flex items-center gap-2">
									<Input
										type="email"
										required
										placeholder={t("waitlist.email")}
										{...form.register("email")}
									/>
									<Button
										disabled={hasStartedTyping && !turnstileToken}
										type="submit"
										variant="primary"
										loading={form.formState.isSubmitting}
									>
										{t("waitlist.cta.submit")}
									</Button>
								</div>
								<TurnstileField
									key={turnstileResetKey}
									action="waitlist_form"
									className="mt-4"
									enabled={hasStartedTyping}
									onTokenChange={(token) => {
										setTurnstileToken(token);
										if (token) {
											form.clearErrors("root");
										}
									}}
								/>
							</form>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
