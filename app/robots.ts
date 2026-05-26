import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/unlock"],
      },
    ],
    sitemap: "https://fixfeet.co.il/sitemap.xml",
    host: "https://fixfeet.co.il",
  };
}
