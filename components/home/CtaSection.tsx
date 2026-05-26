"use client";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";
import businessConfig from "@/business.config.json";

export default function CtaSection() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const prefix = locale === "he" ? "" : "/en";

  return (
    <section
      className="py-20 lg:py-28 bg-white"
      dir={locale === "he" ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-10 sm:p-14 shadow-2xl"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href={`${prefix}/booking`} className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {t("primary")}
              </Link>
            </Button>
            {businessConfig.phone ? (
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900">
                <a href={`tel:${businessConfig.phone}`} className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  {t("secondary")}
                </a>
              </Button>
            ) : (
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900">
                <Link href={`${prefix}/contact`} className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  {t("secondary")}
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
