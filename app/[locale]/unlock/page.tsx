"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Footprints, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UnlockPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = useTranslations("unlock");
  const router = useRouter();
  const isRtl = locale === "he";

  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const prefix = locale === "he" ? "/" : "/en/";
        router.push(prefix);
        router.refresh();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-primary/20 mb-4">
            <Footprints className="w-8 h-8 text-brand-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{t("title")}</h1>
          <p className="text-slate-400 text-sm">{t("subtitle")}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 space-y-4"
        >
          <div className="relative">
            <Lock className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("placeholder")}
              required
              className="ps-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus-visible:ring-brand-primary"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{t("error")}</p>
          )}

          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? "..." : t("submit")}
          </Button>
        </form>
      </div>
    </main>
  );
}
