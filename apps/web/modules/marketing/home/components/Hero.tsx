"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { orpc } from "@shared/lib/orpc-query-utils";
import { useMutation } from "@tanstack/react-query";
import { ActivityIcon, CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";
import heroImage from "../../../../public/images/hero-image.png";
import heroImageDark from "../../../../public/images/hero-image-dark.png";

const formSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
});

export function Hero() {
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
		<div id="waitlist" className="relative max-w-full overflow-x-hidden">
			<div className="container relative z-20 pt-24 pb-16 lg:pb-24">
				<div className="mx-auto max-w-3xl text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 font-medium text-success text-sm">
						<ActivityIcon className="size-4" />
						<span>Coming Soon — Early Access</span>
					</div>

					<h1 className="text-balance font-medium text-4xl leading-tighter text-foreground md:text-5xl lg:text-6xl">
						{t("waitlist.hero.title")}
					</h1>

					<p className="mx-auto mt-4 max-w-2xl text-foreground/60 text-base sm:text-lg">
						{t("waitlist.hero.subtitle")}
					</p>

					<div className="mx-auto mt-8 max-w-md">
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
										className="h-12"
										{...form.register("firstName")}
									/>
									<Input
										type="text"
										required
										placeholder={t("waitlist.lastName")}
										className="h-12"
										{...form.register("lastName")}
									/>
								</div>
								<div className="flex items-center gap-2">
									<Input
										type="email"
										required
										placeholder={t("waitlist.email")}
										className="h-12"
										{...form.register("email")}
									/>
									<Button
										type="submit"
										size="lg"
										variant="primary"
										className="shrink-0 whitespace-nowrap"
										loading={form.formState.isSubmitting}
									>
										{t("waitlist.hero.submit")}
									</Button>
								</div>
								{form.formState.errors.email && (
									<p className="mt-2 text-destructive text-xs">
										{form.formState.errors.email.message}
									</p>
								)}
								<p className="mt-3 text-foreground/40 text-xs">
									No credit card required. Unsubscribe
									anytime.
								</p>
							</form>
						)}
					</div>
				</div>

				<div className="mx-auto mt-12 max-w-4xl rounded ring-3 ring-primary lg:mt-16">
					<Image
						src={heroImage}
						alt="StatusFlow — Your website, globally monitored"
						className="block rounded-xl dark:hidden"
						priority
					/>
					<Image
						src={heroImageDark}
						alt="StatusFlow — Your website, globally monitored"
						className="hidden rounded-xl dark:block"
						priority
					/>
				</div>
			</div>
		</div>
	);
}
