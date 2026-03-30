import { baseURL } from "@/app/resources";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/blog",
          "/blog/",
        ],
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
