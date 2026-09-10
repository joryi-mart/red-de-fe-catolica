import type { MetadataRoute } from "next";

const SITE_URL = "https://red-de-fe-catolica.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: ahora,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/lectura`,
      lastModified: ahora,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/videos`,
      lastModified: ahora,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/oraciones`,
      lastModified: ahora,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/via-crucis`,
      lastModified: ahora,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
