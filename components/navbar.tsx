"use client";

import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { ChevronDown, Menu, Search } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import clsx from "clsx";

import {
  navigationGroups,
  priorityMobileLinks,
  type NavigationGroup,
} from "@/config/navigation";
import { siteConfig } from "@/config/site";
import logoImage from "@/public/images/logo.png";

function isGroupActive(group: NavigationGroup, pathname: string) {
  if (group.href === "/") return pathname === "/";
  if (group.href && pathname.startsWith(group.href)) return true;

  return Boolean(
    group.items?.some((item) => {
      const href = item.href.split("#")[0];

      return href === "/" ? pathname === "/" : pathname.startsWith(href);
    }),
  );
}

export const Navbar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const sentinel = document.createElement("div");

    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.position = "absolute";
    sentinel.style.top = "0";
    sentinel.style.height = "1px";
    sentinel.style.width = "1px";
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-30 border-b border-civic-line backdrop-blur transition duration-civic supports-[backdrop-filter]:bg-civic-paper/86",
        isScrolled
          ? "bg-civic-paper/98 shadow-civic-xs"
          : "bg-civic-paper/90 shadow-none",
      )}
    >
      <HeroUINavbar
        classNames={{
          base: "bg-transparent",
          wrapper: "mx-auto h-16 max-w-civic-wide px-4 sm:px-6 lg:px-10",
        }}
        isMenuOpen={isMenuOpen}
        maxWidth="full"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="gap-3" justify="start">
          <NavbarMenuToggle
            className="lg:hidden"
            icon={() => <Menu className="h-5 w-5" />}
          />

          <NavbarBrand className="min-w-0 gap-3">
            <Image
              priority
              alt="Logo Provinsi Sumatera Barat"
              className="h-10 w-auto shrink-0"
              src={logoImage}
            />
            <div className="min-w-0">
              <NextLink
                className="block truncate text-sm font-extrabold leading-tight text-civic-text sm:text-base"
                href="/"
              >
                {siteConfig.name}
              </NextLink>
              <span className="hidden truncate text-xs font-medium text-civic-textMuted sm:block">
                {siteConfig.description}
              </span>
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden gap-1 lg:flex" justify="center">
          {navigationGroups.map((group) => {
            const active = mounted && isGroupActive(group, pathname);

            if (group.items?.length) {
              return (
                <Dropdown key={group.name} placement="bottom">
                  <NavbarItem>
                    <DropdownTrigger>
                      <Button
                        className={clsx(
                          "h-10 rounded-civic px-3 text-sm font-semibold text-civic-textMuted transition duration-civic data-[hover=true]:bg-brand-gold-50 data-[hover=true]:text-civic-text",
                          active && "bg-brand-gold-50 text-semantic-primary",
                        )}
                        endContent={<ChevronDown className="h-4 w-4" />}
                        variant="light"
                      >
                        {group.name}
                      </Button>
                    </DropdownTrigger>
                  </NavbarItem>
                  <DropdownMenu
                    aria-label={`${group.name} menu`}
                    itemClasses={{
                      base: "data-[hover=true]:bg-brand-gold-50",
                    }}
                  >
                    {group.items.map((item) => (
                      <DropdownItem
                        key={item.href}
                        className={clsx(
                          pathname === item.href.split("#")[0] &&
                            "text-semantic-primary",
                        )}
                        description={item.description}
                        href={item.href}
                      >
                        {item.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              );
            }

            return (
              <NavbarItem key={group.name}>
                <NextLink
                  className={clsx(
                    "civic-focus-ring rounded-civic px-3 py-2 text-sm font-semibold text-civic-textMuted transition duration-civic hover:bg-brand-gold-50 hover:text-civic-text",
                    active && "bg-brand-gold-50 text-semantic-primary",
                  )}
                  href={group.href ?? "/"}
                >
                  {group.name}
                </NextLink>
              </NavbarItem>
            );
          })}
        </NavbarContent>

        <NavbarContent className="hidden sm:flex" justify="end">
          <NavbarItem>
            <NextLink
              className="civic-focus-ring inline-flex h-10 items-center gap-2 rounded-civic border border-civic-line bg-civic-cloud px-3 text-sm font-semibold text-civic-text transition duration-civic hover:border-brand-gold-300 hover:bg-brand-gold-50"
              href="/informasi"
            >
              <Search className="h-4 w-4" />
              Cari informasi
            </NextLink>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="max-h-[calc(100dvh-4rem)] overflow-y-auto bg-civic-paper px-4 pb-8 pt-5">
          <NavbarMenuItem>
            <div className="rounded-civic-xl border border-civic-line bg-civic-cloud p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-semantic-primary">
                Akses cepat
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {priorityMobileLinks.map((item) => (
                  <NextLink
                    key={item.href}
                    className="civic-focus-ring rounded-civic border border-civic-line bg-civic-paper px-3 py-2 text-sm font-semibold text-civic-text hover:border-brand-gold-300 hover:bg-brand-gold-50"
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </NextLink>
                ))}
              </div>
            </div>
          </NavbarMenuItem>

          <NavbarMenuItem className="mt-4">
            <div className="space-y-4">
              {navigationGroups.map((group) => (
                <div key={group.name}>
                  {group.href && !group.items?.length ? (
                    <NextLink
                      className="block rounded-civic px-2 py-2 text-base font-bold text-civic-text"
                      href={group.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {group.name}
                    </NextLink>
                  ) : (
                    <>
                      <p className="px-2 py-2 text-base font-bold text-civic-text">
                        {group.name}
                      </p>
                      <div className="grid gap-1 pl-3">
                        {group.items?.map((item) => (
                          <NextLink
                            key={item.href}
                            className="rounded-civic px-3 py-2 text-sm font-medium text-civic-textMuted hover:bg-brand-gold-50 hover:text-civic-text"
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </NextLink>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </NavbarMenuItem>
        </NavbarMenu>
      </HeroUINavbar>
    </header>
  );
};
