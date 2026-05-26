import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/booking/BookingForm";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("booking_title"),
    description: t("booking_desc"),
  };
}

export default async function BookingPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "booking" });

  return (
    <>
      <Navbar locale={locale} />
      <main
        className="flex-1 min-h-screen pt-24 pb-20 bg-slate-50"
        dir={locale === "he" ? "rtl" : "ltr"}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              {t("title")}
            </h1>
            <p className="text-slate-500 text-lg">{t("subtitle")}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sm:p-8">
            <BookingForm />
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
