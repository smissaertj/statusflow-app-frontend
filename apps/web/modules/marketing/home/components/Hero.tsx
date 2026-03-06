"use client";

import { LocaleLink } from "@i18n/routing";
import { Button } from "@repo/ui/components/button";
import { ActivityIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import heroImage from "../../../../public/images/hero-image.png";
import heroImageDark from "../../../../public/images/hero-image-dark.png";

export function Hero() {
	const t = useTranslations();

	return (
		<div className="relative max-w-full overflow-x-hidden">
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
						<Button
							asChild
							size="lg"
							variant="primary"
							className="h-12 w-full sm:w-auto"
						>
							<LocaleLink href="/#waitlist">
								{t("waitlist.hero.submit")}
								<ArrowRightIcon className="size-4" />
							</LocaleLink>
						</Button>
						<p className="mt-3 text-foreground/40 text-xs">
							No credit card required. Unsubscribe anytime.
						</p>
					</div>
				</div>

				<div className="mx-auto mt-12 max-w-4xl rounded ring-3 ring-primary hover:ring-success lg:mt-16">
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
