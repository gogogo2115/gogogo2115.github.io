import type { MetadataRoute } from "next";

type Robots = MetadataRoute.Robots;

export default function robots(): Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    // sitemap: "https://acme.com/sitemap.xml",
  };
}
