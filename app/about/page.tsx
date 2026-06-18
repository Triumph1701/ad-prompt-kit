import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ad Prompt Kit is a professional AI prompt library built for marketing teams, ecommerce operators, creative strategists, and founders who need production-ready reference-image and Runway prompts.",
  openGraph: {
    title: "About Ad Prompt Kit",
    description: "Professional AI prompt templates for marketing teams who create real campaign assets.",
    url: "https://adpromptkit.com/about"
  }
};

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">About</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Professional prompt templates for teams creating real marketing assets
        </h1>
        <div className="mt-8 space-y-6 text-lg leading-8 text-slate-600">
          <p>
            Ad Prompt Kit serves ecommerce operators, creative strategists, growth marketers, founders, agencies, and social media teams who need efficient workflows for briefing AI image and video generation tools.
          </p>
          <p>
            Each template is structured around specific campaign use cases: product advertising, ecommerce hero visuals, social media reels, UGC-style content, product launch teasers, seasonal promotions, and short-form video ads.
          </p>
          <p>
            The focus is practical execution: precise product framing, clear visual direction, actionable storyboard structures, and copy-ready prompts optimized for reference-image and Runway. This version operates entirely from static data with no authentication, payment processing, database, or server-side generation required.
          </p>
        </div>
      </section>
    </main>
  );
}
