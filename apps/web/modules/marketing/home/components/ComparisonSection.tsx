import { CheckIcon, XIcon } from "lucide-react";

const comparisons = [
	{
		oldWay: "Finding out your site is down from a frustrated customer tweet.",
		newWay: "Instant outage alerts across your favorite tools within seconds of a failure.",
	},
	{
		oldWay: "Grasping at headers and stack traces while your conversion rate drops to zero.",
		newWay: "Instant post-mortems: Trace, headers, and body snapshots included in every notification.",
	},
	{
		oldWay: "The 'Not Secure' badge killing your SEO and credibility before you even notice.",
		newWay: "Intelligent alerts for expiring SSL certificates and domain registrations.",
	},
];

export function ComparisonSection() {
	return (
		<section className="py-12 lg:py-16 xl:py-24">
			<div className="container">
				<div className="mb-8 max-w-3xl lg:mb-12">
					<small className="mb-4 block font-medium text-xs uppercase tracking-wider text-primary">
						A better way
					</small>
					<h2 className="font-medium text-3xl lg:text-4xl xl:text-5xl">
						The Old Way vs. StatusFlow
					</h2>
					<p className="mt-2 text-base text-foreground/60 lg:text-lg">
						See how StatusFlow transforms your incident response
						from reactive firefighting to proactive monitoring.
					</p>
				</div>

				<div className="grid gap-4 lg:gap-6">
					{comparisons.map((item) => (
						<div
							key={item.oldWay}
							className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6"
						>
							<div className="flex items-start gap-3 rounded-2xl border border-destructive/80 bg-destructive/20 p-5">
								<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
									<XIcon className="size-4" />
								</div>
								<p className="text-foreground/90 text-sm leading-relaxed lg:text-base">
									{item.oldWay}
								</p>
							</div>
							<div className="flex items-start gap-3 rounded-2xl border border-success/80 bg-success/20 p-5">
								<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
									<CheckIcon className="size-4" />
								</div>
								<p className="text-foreground/90 text-sm leading-relaxed lg:text-base">
									{item.newWay}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
