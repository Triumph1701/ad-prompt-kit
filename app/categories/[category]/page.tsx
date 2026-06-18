import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplateCard } from "@/components/TemplateCard";
import { getCategoryFromSlug, getTemplatesByCategory } from "@/lib/templates";
import { primaryCategories } from "@/data/templates";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return primaryCategories.map((category) => ({ category: category.toLowerCase() }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryFromSlug(categorySlug);

  if (!category) {
    return {};
  }

  return {
    title: `${category} AI Prompt Templates`,
    description: `Browse professional ${category.toLowerCase()} AI prompt templates with reference-based Image Prompts and Runway prompts for product ads, ecommerce hero images, social media content, storyboards, camera notes, and reusable variations.`,
    openGraph: {
      title: `${category} AI Prompt Templates | Ad Prompt Kit`,
      description: `Professional ${category.toLowerCase()} prompts built around a main reference image for product ads, ecommerce visuals, and social campaigns.`,
      url: `https://adpromptkit.com/categories/${categorySlug}`
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryFromSlug(categorySlug);

  if (!category || !primaryCategories.includes(category)) {
    notFound();
  }

  const categoryTemplates = getTemplatesByCategory(category);

  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
            {category} Category
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {category} AI prompt templates
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Professional {category.toLowerCase()} prompt templates with complete Image Prompts, Runway prompts, detailed storyboards, camera and lighting notes, and reusable variations for campaigns. A main reference image guides every template here.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTemplates.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>
      </section>
    </main>
  );
}
