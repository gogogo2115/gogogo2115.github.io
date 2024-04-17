import { BUILD_AT, IS_DEVELOPMENT as isDevelopment } from "@/utils";
import { MetadataRoute } from "next";

const siteMapPrefix = isDevelopment ? "http://localhost:3000" : "https://gogogo2115.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteMapPrefix,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: siteMapPrefix + "/guestbook",
      lastModified: BUILD_AT,
      changeFrequency: "weekly",
      priority: 1,
    },
    // {
    //   url: siteMapPrefix + "/wai-aria",
    //   lastModified: BUILD_AT,
    //   changeFrequency: "monthly",
    //   priority: 1,
    // },
  ];
}
