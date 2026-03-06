import {
	BellIcon,
	GlobeIcon,
	MessageSquareIcon,
	SearchIcon,
	ShieldIcon,
	TimerIcon,
	UsersIcon,
	ZapIcon,
} from "lucide-react";
import type { JSXElementConstructor } from "react";

type FeaturePillar = {
	id: string;
	icon: JSXElementConstructor<any>;
	title: string;
	subtitle: string;
	highlights: {
		title: string;
		description: string;
		icon: JSXElementConstructor<any>;
	}[];
};

const pillars: FeaturePillar[] = [
	{
		id: "reliability",
		icon: GlobeIcon,
		title: "Reliability & Speed",
		subtitle:
			"Know exactly when things break. Multi-region checks catch outages the second they happen.",
		highlights: [
			{
				title: "Multi-Region Monitoring",
				description:
					"Check your site's status from 10+ global locations simultaneously. Eliminate false positives and know exactly how your site performs for users in London vs. Los Angeles.",
				icon: GlobeIcon,
			},
			{
				title: "Sub-Minute Check Intervals",
				description:
					"We ping your server every 5, 15, 30, 45 or 60 seconds. Catch outages before your customers even notice, reducing your Mean Time to Repair (MTTR).",
				icon: TimerIcon,
			},
		],
	},
	{
		id: "alerting",
		icon: BellIcon,
		title: "Smart Alerting",
		subtitle:
			"No more alert fatigue. Reach your team where they already work.",
		highlights: [
			{
				title: "Multi-Channel Notifications",
				description:
					"Eliminate the noise. Choose your priority channels for instant notification and leave the crowded inbox behind. Pure signal, delivered instantly via your tool of choice.",
				icon: MessageSquareIcon,
			},
			{
				title: "Reliable Incident Triggering",
				description:
					"Seamlessly bridge your uptime data with your team's existing escalation workflows.",
				icon: UsersIcon,
			},
		],
	},
	{
		id: "diagnostics",
		icon: SearchIcon,
		title: "Deep Diagnostics",
		subtitle:
			"Stop guessing why it went down. Get instant root cause analysis and proactive certificate tracking.",
		highlights: [
			{
				title: "Instant Post-Mortems",
				description:
					"Automatic snapshots of headers and error codes (500, 404, TLS expiry) at the moment of failure. Fix the issue immediately with the data provided in the alert.",
				icon: ZapIcon,
			},
			{
				title: "Continuous SSL/TLS Inspection",
				description:
					"We perform a live cryptographic check of your certificate chain during every uptime scan. Detect configuration issues, trust errors, and upcoming expirations before they impact your users.",
				icon: ShieldIcon,
			},
		],
	},
];

export function Features() {
	return (
		<section id="features" className="scroll-my-20 py-12 lg:py-16 xl:py-24">
			<div className="container">
				<div className="mb-6 max-w-3xl lg:mb-0">
					<small className="mb-4 block font-medium text-xs uppercase tracking-wider text-primary">
						Why StatusFlow
					</small>
					<h2 className="font-medium text-3xl lg:text-4xl xl:text-5xl">
						Everything You Need to Stay Ahead of Downtime
					</h2>
					<p className="mt-2 text-base text-foreground/60 lg:text-lg">
						Advanced uptime monitoring that cuts through the noise.
						Get deep diagnostics and instant alerts before your
						customers do.
					</p>
				</div>
			</div>

			<div className="container mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:gap-20">
				{pillars.map((pillar) => {
					const PillarIcon = pillar.icon;
					return (
						<div key={pillar.id}>
							<div className="flex items-start gap-4">
								<div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
									<PillarIcon className="size-6" />
								</div>
								<div>
									<h3 className="font-medium text-xl lg:text-2xl">
										{pillar.title}
									</h3>
									<p className="mt-1 max-w-2xl text-foreground/60">
										{pillar.subtitle}
									</p>
								</div>
							</div>

							<div className="mt-6 grid gap-6 sm:grid-cols-2">
								{pillar.highlights.map((highlight) => {
									const HighlightIcon = highlight.icon;
									return (
										<div
											key={highlight.title}
											className="rounded-3xl border border-primary bg-card p-6"
										>
											<div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
												<HighlightIcon className="size-5" />
											</div>
											<h4 className="font-medium text-base">
												{highlight.title}
											</h4>
											<p className="mt-1 text-foreground/60 text-sm leading-relaxed">
												{highlight.description}
											</p>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
