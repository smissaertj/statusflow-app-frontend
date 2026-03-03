import { ComparisonSection } from "@marketing/home/components/ComparisonSection";
import { ContactSection } from "@marketing/home/components/ContactSection";
import { FaqSection } from "@marketing/home/components/FaqSection";
import { Features } from "@marketing/home/components/Features";
import { Hero } from "@marketing/home/components/Hero";
import { WaitlistCTA } from "@marketing/home/components/WaitlistCTA";
import { setRequestLocale } from "next-intl/server";

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<>
			<Hero />
			<Features />
			{/* <PricingSection /> */}
			<ComparisonSection />
			<FaqSection />
			{/* <Newsletter /> */}
			<WaitlistCTA />
			<ContactSection />
		</>
	);
}
