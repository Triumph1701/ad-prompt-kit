import { categories, templates, type PromptTemplate, type TemplateCategory } from "@/data/templates";

export const categorySlugMap: Record<string, TemplateCategory> = {
  beauty: "Beauty",
  food: "Food",
  fashion: "Fashion",
  general: "General"
};

export const categoryToSlug = (category: TemplateCategory) => category.toLowerCase();

export const useCases = Array.from(new Set(templates.map((template) => template.useCase)));
export const platformOptions = [
  "All",
  "Meta Ads",
  "TikTok Ads",
  "Google Ads",
  "YouTube Ads",
  "LinkedIn Ads"
] as const;
export const formatOptions = [
  "All",
  "Image Prompt",
  "Runway Video Prompt",
  "Storyboard",
  "UGC Script",
  "Ecommerce Hero"
] as const;
export const goalOptions = [
  "All",
  "Product Launch",
  "Sales",
  "Awareness",
  "Retargeting",
  "Seasonal Campaign"
] as const;

export function getTemplateBySlug(slug: string): PromptTemplate | undefined {
  return templates.find((template) => template.slug === slug);
}

export function getTemplatesByCategory(category: TemplateCategory): PromptTemplate[] {
  return templates.filter((template) => template.category === category);
}

export function getRelatedTemplates(template: PromptTemplate): PromptTemplate[] {
  return template.relatedSlugs
    .map((slug) => getTemplateBySlug(slug))
    .filter((item): item is PromptTemplate => Boolean(item));
}

export function getCategoryFromSlug(slug: string): TemplateCategory | undefined {
  return categorySlugMap[slug];
}

export function isCategory(value: string): value is TemplateCategory {
  return categories.includes(value as TemplateCategory);
}

export function getPrimaryReferenceImage(template: PromptTemplate) {
  return template.referenceImages[template.primaryReferenceImageIndex];
}

export function getTemplatePlatforms(template: PromptTemplate) {
  const text = [
    template.title,
    template.useCase,
    template.searchIntent,
    template.shortDescription
  ]
    .join(" ")
    .toLowerCase();

  const platforms: string[] = [];

  if (/meta|facebook|instagram|social|retargeting|carousel/.test(text)) {
    platforms.push("Meta Ads");
  }
  if (/tiktok|short-form|reel|ugc|creator|outfit transition|recipe/.test(text)) {
    platforms.push("TikTok Ads");
  }
  if (/google|display|search|landing page|ecommerce hero/.test(text)) {
    platforms.push("Google Ads");
  }
  if (/youtube|shorts|video|commercial/.test(text)) {
    platforms.push("YouTube Ads");
  }
  if (/linkedin|b2b|saas|feature launch/.test(text)) {
    platforms.push("LinkedIn Ads");
  }

  if (platforms.length === 0) {
    platforms.push("Meta Ads");
  }

  return platforms;
}

export function getTemplateFormats(template: PromptTemplate) {
  const text = [
    template.title,
    template.useCase,
    template.searchIntent,
    template.shortDescription
  ]
    .join(" ")
    .toLowerCase();

  const formats: string[] = ["Image Prompt", "Runway Video Prompt", "Storyboard"];

  if (/ugc|creator|testimonial|try-on|taste-test/.test(text)) {
    formats.push("UGC Script");
  }
  if (/hero|landing page|ecommerce/.test(text)) {
    formats.push("Ecommerce Hero");
  }

  return formats;
}

export function getTemplateGoals(template: PromptTemplate) {
  const text = [
    template.title,
    template.useCase,
    template.searchIntent,
    template.shortDescription
  ]
    .join(" ")
    .toLowerCase();

  const goals: string[] = [];

  if (/launch|drop|teaser|feature launch|new product/.test(text)) {
    goals.push("Product Launch");
  }
  if (/sale|black friday|promo|offer|bundle/.test(text)) {
    goals.push("Sales");
  }
  if (/commercial|campaign|lookbook|awareness|brand/.test(text)) {
    goals.push("Awareness");
  }
  if (/retargeting|retarget|carousel|hero|testimonial|comparison/.test(text)) {
    goals.push("Retargeting");
  }
  if (/seasonal|summer|holiday|spring|winter/.test(text)) {
    goals.push("Seasonal Campaign");
  }

  if (goals.length === 0) {
    goals.push("Awareness");
  }

  return goals;
}

export function getTemplateSearchText(template: PromptTemplate) {
  return [
    template.title,
    template.category,
    template.useCase,
    template.searchIntent,
    template.shortDescription,
    template.midjourneyPrompt,
    template.runwayPrompt,
    ...getTemplatePlatforms(template),
    ...getTemplateFormats(template),
    ...getTemplateGoals(template)
  ]
    .join(" ")
    .toLowerCase();
}

export function matchesPlatform(template: PromptTemplate, platform: string) {
  if (platform === "All") {
    return true;
  }

  return getTemplatePlatforms(template).includes(platform);
}

export function matchesFormat(template: PromptTemplate, format: string) {
  if (format === "All") {
    return true;
  }

  return getTemplateFormats(template).includes(format);
}

export function matchesGoal(template: PromptTemplate, goal: string) {
  if (goal === "All") {
    return true;
  }

  return getTemplateGoals(template).includes(goal);
}
