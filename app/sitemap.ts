import type { MetadataRoute } from "next";

// 페이지가 정적이라는 것을 명시적으로 선언
export const dynamic = "force-static";

// ISR을 사용하여 일정 시간(초)마다 재생성하도록 설정
// export const revalidate = 600;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // {
    //   url: "https://acme.com",
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 1,
    // },
    // {
    //   url: "https://acme.com/about",
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
    // {
    //   url: "https://acme.com/blog",
    //   lastModified: new Date(),
    //   changeFrequency: "weekly",
    //   priority: 0.5,
    // },
  ];
}
