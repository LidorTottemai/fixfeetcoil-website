import Link from "next/link";
import { useTranslations } from "next-intl";
import { Footprints, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import businessConfig from "@/business.config.json";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const c = useTranslations("contact");
  const isRtl = locale === "he";
  const prefix = locale === "he" ? "" : "/en";

  return (
    <footer
      className="bg-brand-dark text-white"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link
              href={`${prefix}/`}
              className="flex items-center gap-2 font-bold text-2xl text-white mb-4"
            >
              <Footprints className="w-8 h-8 text-brand-secondary" />
              <span>FixFeet</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t("tagline")}
            </p>
            {businessConfig.whatsapp && (
              <a
                href={`https://wa.me/${businessConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[#25D366] hover:text-[#1ebe5d] font-medium text-sm transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            )}
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t("links_title")}</h3>
            <ul className="space-y-2">
              {[
                { href: `${prefix}/`, label: nav("home") },
                { href: `${prefix}/#services`, label: nav("services") },
                { href: `${prefix}/booking`, label: nav("booking") },
                { href: `${prefix}/contact`, label: nav("contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t("contact_title")}</h3>
            <ul className="space-y-3">
              {businessConfig.phone && (
                <li className="flex items-center gap-3 text-sm text-slate-400">
                  <Phone className="w-4 h-4 text-brand-secondary flex-shrink-0" />
                  <a
                    href={`tel:${businessConfig.phone}`}
                    className="hover:text-white transition-colors"
                  >
                    {businessConfig.phone}
                  </a>
                </li>
              )}
              {businessConfig.address && (
                <li className="flex items-start gap-3 text-sm text-slate-400">
                  <MapPin className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span>{businessConfig.address}</span>
                </li>
              )}
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <Clock className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p>{c("hours.weekdays")}</p>
                  <p>{c("hours.friday")}</p>
                  <p>{c("hours.saturday")}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} FixFeet. {t("rights")}.
          </p>
          <div className="flex gap-4">
            <Link href={`${prefix}/`} className="hover:text-white transition-colors">
              {t("privacy")}
            </Link>
            <Link href={`${prefix}/`} className="hover:text-white transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
