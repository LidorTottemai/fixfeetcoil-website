"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/components/ui/cn";
import { Phone, MapPin, Clock, MessageCircle, CheckCircle2, Send } from "lucide-react";
import businessConfig from "@/business.config.json";

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = useTranslations("contact");
  const isRtl = locale === "he";

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);
    setSuccess(true);
  };

  type InfoItem = {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | null;
    multi?: string[];
    href: string | null;
    color: string;
  };

  const infoItems: InfoItem[] = [
    ...(businessConfig.phone
      ? [{
          icon: Phone,
          label: t("phone_label"),
          value: businessConfig.phone,
          href: `tel:${businessConfig.phone}`,
          color: "text-brand-primary bg-brand-primary/10",
        }]
      : []),
    ...(businessConfig.address
      ? [{
          icon: MapPin,
          label: t("address_label"),
          value: businessConfig.address,
          href: null,
          color: "text-brand-secondary bg-brand-secondary/10",
        }]
      : []),
    {
      icon: Clock,
      label: t("hours_label"),
      value: null,
      multi: [t("hours.weekdays"), t("hours.friday"), t("hours.saturday")],
      href: null,
      color: "text-brand-accent bg-brand-accent/10",
    },
  ];

  return (
    <>
      <Navbar locale={locale} />
      <main
        className="flex-1 min-h-screen pt-24 pb-20 bg-slate-50"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              {t("title")}
            </h1>
            <p className="text-lg text-slate-500">{t("subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Info panel */}
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              {infoItems.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex gap-4"
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                      item.color
                    )}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-400 mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-medium text-slate-900 hover:text-brand-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : item.value ? (
                      <p className="font-medium text-slate-900">{item.value}</p>
                    ) : item.multi ? (
                      <div className="space-y-0.5">
                        {item.multi.map((line, j) => (
                          <p key={j} className="text-sm text-slate-700">
                            {line}
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              {businessConfig.whatsapp && (
                <a
                  href={`https://wa.me/${businessConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex"
                >
                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="w-full flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </Button>
                </a>
              )}
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                {t("form_title")}
              </h2>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center gap-4 py-8"
                >
                  <CheckCircle2 className="w-14 h-14 text-brand-secondary" />
                  <p className="font-medium text-slate-700">{t("success")}</p>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setForm({ name: "", email: "", message: "" });
                    }}
                    className="text-sm text-slate-400 hover:text-slate-600 underline"
                  >
                    {locale === "he" ? "שלח הודעה נוספת" : "Send another message"}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-name">{t("name")} *</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t("name_placeholder")}
                      required
                      className={cn(isRtl && "text-right")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email">{t("email")} *</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t("email_placeholder")}
                      required
                      className={cn(isRtl && "text-right")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-message">{t("message")} *</Label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t("message_placeholder")}
                      required
                      rows={5}
                      className={cn(
                        "flex w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:border-brand-primary resize-none",
                        isRtl && "text-right"
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center gap-2"
                    size="lg"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? t("submitting") : t("submit")}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
