import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/setting"],
      crawlDelay: 600,
    },
    sitemap: "https://gogogo2115.github.io/sitemap.xml",
  };
}
