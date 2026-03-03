import { cn } from "../lib";

export function Logo({
	withLabel = true,
	className,
	iconSize = "h12 w-12",
}: {
	className?: string;
	withLabel?: boolean;
	iconSize?: string;
}) {
	return (
		<span
			className={cn(
				"flex items-center font-semibold text-foreground leading-none",
				className,
			)}
		>
			<img src="/images/logo.png" alt="StatusFlow" className={iconSize} />
			{withLabel && (
				<span className="ml-3 hidden text-lg md:block">StatusFlow</span>
			)}
		</span>
	);
}
