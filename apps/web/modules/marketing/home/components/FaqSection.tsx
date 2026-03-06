"use client";

import { cn } from "@repo/ui";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@repo/ui/components/accordion";
import { useTranslations } from "next-intl";

export function FaqSection({ className }: { className?: string }) {
	const t = useTranslations();

	const items = [
		{
			question: "What regions do you monitor from?",
			answer: "StatusFlow monitors your site from 10+ global locations simultaneously, including North America, Europe, and Asia-Pacific. This eliminates false positives and gives you a true picture of your site's availability worldwide.",
		},
		{
			question: "How fast will I get alerted?",
			answer: "With sub-minute check intervals (every 5, 15, 30, 45 or 60 seconds), you'll receive an alert within seconds of an outage. Alerts are delivered to Slack, Telegram, Discord, SMS, or Email — wherever your team works.",
		},
		{
			question: "What are Instant post-mortems?",
			answer: "When your site or application goes down, StatusFlow automatically captures a snapshot of HTTP headers, error codes (500, 404, TLS expiry), and response data at the moment of failure. This data is attached directly to your alert so you can diagnose and fix the issue immediately.",
		},
		{
			question: "Will there be a free tier?",
			answer: "Yes! We plan to offer a generous free tier at launch. Early adopters who join the waiting list will also receive 1 month of Pro features for free — no credit card required.",
		},
		{
			question: "What notification channels are supported?",
			answer: "StatusFlow supports Slack, Telegram, Discord, SMS, Email and Webhooks out of the box. Smart escalation policies on your end ensure that if the first responder doesn't acknowledge an alert, the next person on the team is automatically notified.",
		},
		{
			question: "How does SSL certificate tracking work?",
			answer: "StatusFlow automatically monitors the expiration dates of your SSL/TLS certificates and sends you a reminder 30 days before they expire. No more surprise expirations taking your site down.",
		},
	];

	if (!items) {
		return null;
	}

	return (
		<section
			className={cn("scroll-mt-20 py-12 lg:py-16 xl:py-24", className)}
			id="faq"
		>
			<div className="container">
				<div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 md:gap-8 lg:gap-12">
					<div className="">
						<h1 className="mb-2 font-medium text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tighter text-foreground">
							{t("faq.title")}
						</h1>
						<p className="text-foreground/60 text-sm sm:text-lg">
							{t("faq.description")}
						</p>
					</div>
					<Accordion
						type="single"
						collapsible
						className="w-full space-y-2"
					>
						{items.map((item, i) => (
							<AccordionItem
								key={`faq-item-${i}`}
								value={`item-${i}`}
								className="rounded-lg bg-card shadow-none border px-4 lg:px-6"
							>
								<AccordionTrigger className="text-left font-medium text-base hover:no-underline">
									{item.question}
								</AccordionTrigger>
								<AccordionContent className="text-foreground/60">
									{item.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}
