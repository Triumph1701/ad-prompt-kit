import type { Metadata } from "next";
import { PromptGenerator } from "@/components/PromptGenerator";

export const metadata: Metadata = {
  title: "AI Prompt Generator",
  description:
    "Generate custom Image Prompts and Runway prompts locally without API calls. Select product type, category, style, aspect ratio, and output format to build production-ready AI prompts for ads and ecommerce.",
  openGraph: {
    title: "AI Prompt Generator | Ad Prompt Kit",
    description: "Generate custom Image Prompts and Runway prompts for product ads and ecommerce visuals. No API required.",
    url: "https://adpromptkit.com/generator"
  }
};

export default function GeneratorPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Prompt Generator</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Generate custom AI prompts instantly
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            No API calls required. Select your product details, style preferences, and output format to build a production-ready Image Prompt or Runway prompt locally in your browser.
          </p>
        </div>
        <div className="mt-10">
          <PromptGenerator />
        </div>
      </section>
    </main>
  );
}
