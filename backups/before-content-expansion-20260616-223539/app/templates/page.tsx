import type { Metadata } from "next";
import { TemplateFilters } from "@/components/TemplateFilters";
import { templates } from "@/data/templates";

export const metadata: Metadata = {
  title: "AI Prompt Template Library",
  description:
    "Browse professional ad prompt templates with reference-based image prompts, Runway video prompts, storyboards, camera notes, lighting direction, and reusable variations for ads, ecommerce, and social media campaigns.",
  openGraph: {
    title: "AI Prompt Template Library | Ad Prompt Kit",
    description: "Professional ad prompt templates with Image Prompts, Runway video prompts, storyboards, and reusable campaign directions.",
    url: "https://adpromptkit.com/templates"
  }
};

export default function TemplatesPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Template Library</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Professional AI prompt templates for marketing campaigns
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Browse professional ad prompt templates with reference-based image prompts, Runway video prompts, storyboards, camera notes, lighting direction, and reusable variations.
          </p>
        </div>
        <div className="mt-10">
          <TemplateFilters templates={templates} />
        </div>
      </section>
    </main>
  );
}
