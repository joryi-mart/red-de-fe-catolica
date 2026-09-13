import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/testimonios/admin",
    },
    sitemap: "https://red-de-fe-catolica.vercel.app/sitemap.xml",
  };
}
