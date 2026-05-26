"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/components/ui/cn";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import businessConfig from "@/business.config.json";

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

const defaultForm: FormData = {
  name: "",
  phone: "",
  email: "",
  service: "",
  date: "",
  time: "",
  notes: "",
};

export default function BookingForm() {
  const t = useTranslations("booking");
  const locale = useLocale();
  const isRtl = locale === "he";

  const [form, setForm] = useState<FormData>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const services = t.raw("services") as string[];
  const times = t.raw("times") as string[];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      `*${t("name")}:* ${form.name}`,
      `*${t("phone")}:* ${form.phone}`,
      form.email ? `*${t("email")}:* ${form.email}` : null,
      form.service ? `*${t("service")}:* ${form.service}` : null,
      form.date ? `*${t("date")}:* ${form.date}` : null,
      form.time ? `*${t("time")}:* ${form.time}` : null,
      form.notes ? `*${t("notes")}:* ${form.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    return encodeURIComponent(lines);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = cn(
    "w-full",
    isRtl && "text-right"
  );

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center gap-6 py-12"
      >
        <div className="w-20 h-20 rounded-full bg-brand-secondary/10 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-brand-secondary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            {t("success_title")}
          </h3>
          <p className="text-slate-500 max-w-sm">{t("success_msg")}</p>
        </div>
        {businessConfig.whatsapp && (
          <a
            href={`https://wa.me/${businessConfig.whatsapp}?text=${buildWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="lg" className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {t("whatsapp_btn")}
            </Button>
          </a>
        )}
        <button
          onClick={() => { setSubmitted(false); setForm(defaultForm); }}
          className="text-sm text-slate-400 hover:text-slate-600 transition-colors underline"
        >
          {locale === "he" ? "קביעת תור נוסף" : "Book another appointment"}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} dir={isRtl ? "rtl" : "ltr"} className="space-y-5">
      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">{t("name")} *</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t("name_placeholder")}
            required
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">{t("phone")} *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder={t("phone_placeholder")}
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t("email_placeholder")}
          className={inputClass}
        />
      </div>

      {/* Service */}
      <div className="space-y-1.5">
        <Label htmlFor="service">{t("service")} *</Label>
        <select
          id="service"
          name="service"
          value={form.service}
          onChange={handleChange}
          required
          className={cn(
            "flex h-11 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:border-brand-primary",
            isRtl && "text-right"
          )}
        >
          <option value="">{t("service_placeholder")}</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="date">{t("date")} *</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]}
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="time">{t("time")} *</Label>
          <select
            id="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className={cn(
              "flex h-11 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:border-brand-primary",
              isRtl && "text-right"
            )}
          >
            <option value="">{t("time_placeholder")}</option>
            {times.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <Label htmlFor="notes">{t("notes")}</Label>
        <textarea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder={t("notes_placeholder")}
          rows={4}
          className={cn(
            "flex w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:border-brand-primary resize-none",
            isRtl && "text-right"
          )}
        />
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 flex items-center gap-2"
          size="lg"
        >
          <Send className="w-4 h-4" />
          {loading ? t("submitting") : t("submit")}
        </Button>
        {businessConfig.whatsapp && (
          <Button
            type="button"
            variant="whatsapp"
            size="lg"
            className="flex items-center gap-2"
            onClick={() => {
              window.open(
                `https://wa.me/${businessConfig.whatsapp}?text=${buildWhatsAppMessage()}`,
                "_blank"
              );
            }}
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </Button>
        )}
      </div>
    </form>
  );
}
