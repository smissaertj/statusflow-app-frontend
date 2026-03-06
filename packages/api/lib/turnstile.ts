import { ORPCError } from "@orpc/client";
import { config } from "../config";

type TurnstileVerificationResult = {
	action?: string;
	success: boolean;
};

function getClientIp(headers: Headers) {
	const cfConnectingIp = headers.get("cf-connecting-ip");

	if (cfConnectingIp) {
		return cfConnectingIp;
	}

	const forwardedFor = headers.get("x-forwarded-for");

	if (forwardedFor) {
		return forwardedFor.split(",")[0]?.trim();
	}

	return headers.get("x-real-ip") ?? undefined;
}

export async function verifyTurnstileToken({
	action,
	headers,
	token,
}: {
	action: string;
	headers: Headers;
	token: string;
}) {
	if (!config.turnstileSecretKey) {
		throw new ORPCError("INTERNAL_SERVER_ERROR");
	}

	const requestBody = new URLSearchParams({
		secret: config.turnstileSecretKey,
		response: token,
	});

	const clientIp = getClientIp(headers);

	if (clientIp) {
		requestBody.set("remoteip", clientIp);
	}

	const response = await fetch(
		"https://challenges.cloudflare.com/turnstile/v0/siteverify",
		{
			body: requestBody,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			method: "POST",
		},
	);

	if (!response.ok) {
		throw new ORPCError("INTERNAL_SERVER_ERROR");
	}

	const result =
		(await response.json()) as TurnstileVerificationResult;

	if (!result.success || result.action !== action) {
		throw new ORPCError("BAD_REQUEST");
	}
}
