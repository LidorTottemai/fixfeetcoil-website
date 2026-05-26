"use client";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Footprints,
  Activity,
  HeartPulse,
  Zap,
  Layers,
  ScanLine,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Footprints,
  Activity,
  HeartPulse,
  Zap,
  Layers,
  ScanLine,
};

const iconColors = [
  "text-brand-primary bg-brand-primary/10",
  "text-brand-secondary bg-brand-secondary/10",
  "text-brand-accent bg-brand-accent/10",
  "text-purple-600 bg-purple-50",
  "text-pink-600 bg-pink-50",
  "text-cyan-600 bg-cyan-50",
];

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function FeaturesSection() {
  const t = useTranslations("features");
  const locale = useLocale();
  const items = t.raw("items") as Array<{ icon: string; title: string; desc: string }>;

  return (
    <section
      id="services"
      className="py-20 lg:py-28 bg-slate-50"
      dir={locale === "he" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Footprints;
            return (
              <motion.div
                key={i}
                variants={cardVariant}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card className="h-full hover:-translate-y-1 transition-transform duration-200">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${iconColors[i % iconColors.length]}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
