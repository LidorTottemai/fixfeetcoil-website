"use client";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";

export default function StatsSection() {
  const t = useTranslations("stats");
  const locale = useLocale();
  const items = t.raw("items") as Array<{ value: string; label: string }>;

  return (
    <section
      className="py-20 bg-gradient-to-r from-brand-primary via-blue-600 to-brand-primary"
      dir={locale === "he" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl sm:text-3xl font-extrabold text-white mb-12"
        >
          {t("title")}
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-blue-200 text-sm sm:text-base font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
