"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { Menu, X, Footprints } from "lucide-react";

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isRtl = locale === "he";
  const prefix = locale === "he" ? "" : "/en";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: `${prefix}/`, label: t("home") },
    { href: `${prefix}/#services`, label: t("services") },
    { href: `${prefix}/booking`, label: t("booking") },
    { href: `${prefix}/contact`, label: t("contact") },
  ];

  const altLocale = locale === "he" ? "en" : "he";
  const altPrefix = altLocale === "he" ? "" : "/en";

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`${prefix}/`}
          className="flex items-center gap-2 font-bold text-xl text-brand-primary"
        >
          <Footprints className="w-7 h-7" />
          <span>FixFeet</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-brand-primary rounded-lg hover:bg-slate-50 transition-colors min-touch flex items-center"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={`${altPrefix}/`}
            className="text-sm font-medium text-slate-500 hover:text-brand-primary transition-colors px-3 py-2 rounded-lg hover:bg-slate-50"
          >
            {t("lang")}
          </Link>
          <Button asChild size="sm">
            <Link href={`${prefix}/booking`}>{t("booking")}</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden min-touch flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium text-slate-700 hover:text-brand-primary hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-slate-100 mt-2 pt-2 flex items-center justify-between">
              <Link
                href={`${altPrefix}/`}
                className="text-sm text-slate-500 hover:text-brand-primary px-4 py-2"
                onClick={() => setOpen(false)}
              >
                {t("lang")}
              </Link>
              <Button asChild size="sm">
                <Link href={`${prefix}/booking`} onClick={() => setOpen(false)}>
                  {t("booking")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
