"use client";

import { LocaleLink, useLocalePathname } from "@i18n/routing";
import { cn, Logo } from "@repo/ui";
import { Button } from "@repo/ui/components/button";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@repo/ui/components/sheet";
import { ColorModeToggle } from "@shared/components/ColorModeToggle";
import { MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

export function NavBar() {
	const t = useTranslations();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const localePathname = useLocalePathname();
	const [isTop, setIsTop] = useState(true);

	const handleMobileMenuClose = () => {
		setMobileMenuOpen(false);
	};

	const debouncedScrollHandler = useDebounceCallback(
		() => {
			setIsTop(window.scrollY <= 10);
		},
		150,
		{
			maxWait: 150,
		},
	);

	useEffect(() => {
		window.addEventListener("scroll", debouncedScrollHandler);
		debouncedScrollHandler();
		return () => {
			window.removeEventListener("scroll", debouncedScrollHandler);
		};
	}, [debouncedScrollHandler]);

	useEffect(() => {
		handleMobileMenuClose();
	}, [localePathname]);

	const menuItems: {
		label: string;
		href: string;
	}[] = [
		{
			label: t("common.menu.features"),
			href: "/#features",
		},
		{
			label: t("common.menu.faq"),
			href: "/#faq",
		},
		{
			label: t("common.menu.contact"),
			href: "/#contact",
		},
	];

	const isMenuItemActive = (href: string) => localePathname.startsWith(href);

	return (
		<nav
			className={cn(
				"sticky top-0 z-50 w-full transition-shadow duration-200 bg-background",
				{ "border-b": !isTop },
			)}
			data-test="navigation"
		>
			<div className="container">
				<div
					className={cn(
						"flex items-center justify-stretch gap-6 transition-[padding] duration-200",
						!isTop ? "py-4" : "py-6",
					)}
				>
					<div className="flex flex-1 justify-start">
						<LocaleLink
							href="/"
							className="block hover:no-underline active:no-underline"
						>
							<Logo />
						</LocaleLink>
					</div>

					<div className="hidden flex-1 items-center justify-center lg:flex">
						{menuItems.map((menuItem) => (
							<LocaleLink
								key={menuItem.href}
								href={menuItem.href}
								className={cn(
									"block px-3 py-2 font-medium text-foreground/80 text-sm",
									isMenuItemActive(menuItem.href)
										? "font-bold text-foreground"
										: "",
								)}
								prefetch
							>
								{menuItem.label}
							</LocaleLink>
						))}
					</div>

					<div className="flex flex-1 items-center justify-end gap-3">
						<ColorModeToggle />

						<Sheet
							open={mobileMenuOpen}
							onOpenChange={(open) => setMobileMenuOpen(open)}
						>
							<SheetTrigger asChild>
								<Button
									className="lg:hidden"
									size="icon"
									variant="secondary"
									aria-label="Menu"
								>
									<MenuIcon className="size-4" />
								</Button>
							</SheetTrigger>
							<SheetContent className="w-[280px]" side="right">
								<SheetTitle />
								<div className="flex flex-col items-start justify-center">
									{menuItems.map((menuItem) => (
										<LocaleLink
											key={menuItem.href}
											href={menuItem.href}
											onClick={handleMobileMenuClose}
											className={cn(
												"block px-3 py-2 font-medium text-base text-foreground/80",
												isMenuItemActive(menuItem.href)
													? "font-bold text-foreground"
													: "",
											)}
											prefetch
										>
											{menuItem.label}
										</LocaleLink>
									))}

									<LocaleLink
										href="/#waitlist"
										className="mt-2 block px-3 py-2 font-medium text-primary text-base"
										onClick={handleMobileMenuClose}
									>
										{t("common.menu.joinWaitlist")}
									</LocaleLink>
								</div>
							</SheetContent>
						</Sheet>

						<Button
							className="hidden lg:flex"
							asChild
							variant="primary"
						>
							<LocaleLink href="/#waitlist">
								{t("common.menu.joinWaitlist")}
							</LocaleLink>
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
}
