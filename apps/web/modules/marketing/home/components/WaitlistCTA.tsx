"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { orpc } from "@shared/lib/orpc-query-utils";
import { useMutation } from "@tanstack/react-query";
import { CheckCircleIcon, RocketIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
});

export function WaitlistCTA() {
	const t = useTranslations();
	const waitlistMutation = useMutation(orpc.waitlist.join.mutationOptions());

	const form = useForm({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = form.handleSubmit(
		async ({ firstName, lastName, email }) => {
			try {
				await waitlistMutation.mutateAsync({
					firstName,
					lastName,
					email,
				});
			} catch {
				form.setError("email", {
					message: t("waitlist.hints.error.message"),
				});
			}
		},
	);

	return (
		<section className="py-12 lg:py-16 xl:py-24">
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
										type="submit"
										variant="primary"
										loading={form.formState.isSubmitting}
									>
										{t("waitlist.cta.submit")}
									</Button>
								</div>
								{form.formState.errors.email && (
									<p className="mt-1 text-destructive text-xs">
										{form.formState.errors.email.message}
									</p>
								)}
							</form>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
