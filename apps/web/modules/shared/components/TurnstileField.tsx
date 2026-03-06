"use client";

import {
	Turnstile,
	type TurnstileInstance,
} from "@marsidev/react-turnstile";
import { useCallback, useEffect, useRef, useState } from "react";
import { config } from "@/config";

type VerificationStatus = "idle" | "required" | "verified";

type TurnstileFieldProps = {
	action: string;
	className?: string;
	enabled: boolean;
	onTokenChange: (token: string | null) => void;
};

export function TurnstileField({
	action,
	className,
	enabled,
	onTokenChange,
}: TurnstileFieldProps) {
	const [status, setStatus] = useState<VerificationStatus>("idle");
	const widgetRef = useRef<TurnstileInstance | null>(null);

	useEffect(() => {
		if (enabled) {
			setStatus((currentStatus) =>
				currentStatus === "idle" ? "required" : currentStatus,
			);
		}
	}, [enabled]);

	const handleVerificationRequired = useCallback(() => {
		onTokenChange(null);
		setStatus("required");
		widgetRef.current?.reset();
	}, [onTokenChange]);

	const handleSuccess = useCallback(
		(token: string) => {
			onTokenChange(token);
			setStatus("verified");
		},
		[onTokenChange],
	);

	if (!enabled) {
		return null;
	}

	if (!config.turnstileSiteKey) {
		return (
			<p className={className ?? "text-destructive text-sm"}>
				Human verification is currently unavailable. Please try again
				later.
			</p>
		);
	}

	return (
		<div className={className}>
			<div className={status === "verified" ? "hidden" : undefined}>
				<Turnstile
					ref={widgetRef}
					siteKey={config.turnstileSiteKey}
					options={{
						action,
						appearance: "interaction-only",
						refreshExpired: "manual",
						responseField: false,
						size: "flexible",
						theme: "auto",
					}}
					onError={handleVerificationRequired}
					onExpire={handleVerificationRequired}
					onSuccess={handleSuccess}
					onTimeout={handleVerificationRequired}
				/>
			</div>
		</div>
	);
}
