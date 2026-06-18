import type { MetadataRoute } from "next";
import { primaryCategories, templates } from "@/data/templates";
import { categoryToSlug } from "@/lib/templates";

const baseUrl = "https://adpromptkit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const learnPages = [
    "/learn",
    "/learn/how-to-write-ai-ad-prompts",
    "/learn/runway-product-video-prompts",
    "/learn/ecommerce-ad-prompt-examples",
    "/learn/tiktok-ugc-ad-prompt-examples",
    "/learn/meta-ad-creative-prompt-templates",
    "/pricing"
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/generator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5
    },
    ...learnPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/learn" ? 0.8 : 0.7
    })),
    ...primaryCategories.map((category) => ({
      url: `${baseUrl}/categories/${categoryToSlug(category)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8
    })),
    ...templates.map((template) => ({
      url: `${baseUrl}/templates/${template.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75
    }))
  ];
}
