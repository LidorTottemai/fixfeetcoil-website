import type { Metadata } from "next";
import { Inter, Heebo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/routing";
import "@/app/globals.css";
import businessConfig from "@/business.config.json";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const heebo = Heebo({ subsets: ["hebrew", "latin"], variable: "--font-heebo" });

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const baseUrl = "https://fixfeet.co.il";
  const canonical = locale === "he" ? baseUrl : `${baseUrl}/en`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t("home_title"),
      template: `%s | FixFeet`,
    },
    description: t("home_desc"),
    alternates: {
      canonical,
      languages: {
        he: baseUrl,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
      url: canonical,
      siteName: "FixFeet",
      title: t("home_title"),
      description: t("home_desc"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("home_title"),
      description: t("home_desc"),
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "FixFeet",
  url: "https://fixfeet.co.il",
  telephone: businessConfig.phone || "",
  address: businessConfig.address
    ? {
        "@type": "PostalAddress",
        addressCountry: "IL",
        streetAddress: businessConfig.address,
      }
    : undefined,
  openingHours: [
    "Su-Th 08:00-19:00",
    "Fr 08:00-14:00",
  ],
  priceRange: "₪₪",
  medicalSpecialty: "Physiotherapy",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as "he" | "en")) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "he" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${heebo.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="alternate" hrefLang="he" href="https://fixfeet.co.il" />
        <link rel="alternate" hrefLang="en" href="https://fixfeet.co.il/en" />
        <link rel="alternate" hrefLang="x-default" href="https://fixfeet.co.il" />
      </head>
      <body className={`${locale === "he" ? "font-hebrew" : "font-sans"} min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
