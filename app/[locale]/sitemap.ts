import { MetadataRoute } from "next";

const baseUrl = "https://fixfeet.co.il";
const locales = ["he", "en"] as const;
const routes = ["/", "/booking", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      const localePath = locale === "he" ? route : `/en${route}`;
      entries.push({
        url: `${baseUrl}${localePath}`,
        lastModified: new Date(),
        changeFrequency: route === "/" ? "weekly" : "monthly",
        priority: route === "/" ? 1.0 : 0.8,
        alternates: {
          languages: {
            he: `${baseUrl}${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      });
    }
  }

  return entries;
}
