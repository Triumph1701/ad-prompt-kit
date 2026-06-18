import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learn AI ad prompt workflows",
  description:
    "Practical guides for creating ecommerce visuals, UGC scripts, product videos, and campaign-ready AI prompts."
};

const articles = [
  {
    href: "/learn/how-to-write-ai-ad-prompts",
    title: "How to Write AI Ad Prompts That Actually Produce Usable Creative",
    description:
      "Learn how to structure prompts that translate into ad-ready visuals instead of vague inspirational output."
  },
  {
    href: "/learn/runway-product-video-prompts",
    title: "Runway Product Video Prompts: How to Turn Product Images Into Short Ads",
    description:
      "Break down how to move from static product imagery into short commercial-style video prompts."
  },
  {
    href: "/learn/ecommerce-ad-prompt-examples",
    title: "Ecommerce Ad Prompt Examples for Product Launches and Seasonal Campaigns",
    description:
      "Use practical prompt structures for launch pushes, sale periods, homepage heroes, and product campaigns."
  },
  {
    href: "/learn/tiktok-ugc-ad-prompt-examples",
    title: "TikTok UGC Ad Prompt Examples for Beauty, Food, and Fashion Brands",
    description:
      "See how creator-style prompt systems change across different consumer categories."
  },
  {
    href: "/learn/meta-ad-creative-prompt-templates",
    title: "Meta Ad Creative Prompt Templates for Ecommerce Retargeting",
    description:
      "Turn prompt templates into sharper product reminders, offer frames, and conversion-focused retargeting ads."
  }
];

export default function LearnPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Learn</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Learn AI ad prompt workflows
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Practical guides for creating ecommerce visuals, UGC scripts, product videos, and campaign-ready AI prompts.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">{article.title}</h2>
              <p className="mt-4 leading-7 text-slate-600">{article.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
