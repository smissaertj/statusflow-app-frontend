import { Heading, Text } from "@react-email/components";
import React from "react";
import { createTranslator } from "use-intl/core";
import Wrapper from "../components/Wrapper";
import type { BaseMailProps } from "../types";
import { defaultLocale, defaultTranslations } from "../util/translations";

export function WaitlistSignup({
	firstName,
	locale,
	translations,
}: {
	firstName: string;
} & BaseMailProps) {
	const t = createTranslator({
		locale,
		messages: translations,
	});

	return (
		<Wrapper>
			<Heading className="text-xl">
				{t("mail.waitlistSignup.subject")}
			</Heading>
			<Text>{t("mail.waitlistSignup.body", { firstName })}</Text>
		</Wrapper>
	);
}

WaitlistSignup.PreviewProps = {
	locale: defaultLocale,
	translations: defaultTranslations,
	firstName: "John",
};

export default WaitlistSignup;
