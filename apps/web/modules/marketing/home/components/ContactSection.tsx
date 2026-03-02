"use client";

import { useTranslations } from "next-intl";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
	const t = useTranslations();

	return (
		<section id="contact" className="scroll-mt-20 py-12 lg:py-16 xl:py-24">
			<div className="container max-w-xl">
				<div className="mb-8 text-center">
					<h2 className="mb-2 font-medium text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tighter text-foreground">
						{t("contact.title")}
					</h2>
					<p className="text-foreground/60 text-sm sm:text-lg">
						{t("contact.description")}
					</p>
				</div>

				<ContactForm />
			</div>
		</section>
	);
}
