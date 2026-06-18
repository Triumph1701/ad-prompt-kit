import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import GiscusComments from "@/components/GiscusComments";
import { TemplateCard } from "@/components/TemplateCard";
import { categories, templates } from "@/data/templates";
import { categoryToSlug } from "@/lib/templates";

const featuredTemplates = templates.slice(0, 6);
const secondaryNav = [
  "Featured",
  "Meta Ads",
  "TikTok Ads",
  "Google Ads",
  "UGC",
  "Ecommerce",
  "Beauty",
  "Food",
  "Fashion",
  "Product Launch",
  "Retargeting"
];
const platformTags = ["Meta Ads", "TikTok Ads", "Google Ads", "YouTube Ads", "LinkedIn Ads"];
const formatTags = ["Image Prompts", "Runway Videos", "UGC Scripts", "Storyboards", "Ecommerce Hero"];
const trustStats = [
  "60 ready-to-use templates",
  "4 campaign categories",
  "Image + Runway prompt formats",
  "No login required",
  "Built for ecommerce campaigns"
];
const browseGoals = [
  { title: "Product Launch", image: "/assets/templates/launch-teaser-main.png" },
  { title: "Sales Campaign", image: "/assets/templates/black-friday-main.png" },
  { title: "UGC Ad", image: "/assets/templates/ugc-main.png" },
  { title: "Ecommerce Hero", image: "/assets/templates/ecommerce-hero-main.png" },
  { title: "Seasonal Sale", image: "/assets/templates/seasonal-sale-main.png" },
  { title: "Retargeting", image: "/assets/templates/meta-carousel-main.png" }
];

const categoryCards: { title: (typeof categories)[number]; image: string }[] = [
  { title: "Beauty", image: "/assets/templates/luxury-serum-main.png" },
  { title: "Food", image: "/assets/templates/coffee-main.png" },
  { title: "Fashion", image: "/assets/templates/lookbook-main.png" },
  { title: "General", image: "/assets/templates/saas-main.png" }
];
const heroWall = [
  "/assets/templates/luxury-serum-main.png",
  "/assets/templates/ugc-main.png",
  "/assets/templates/ecommerce-hero-main.png",
  "/assets/templates/cleanser-main.png",
  "/assets/templates/coffee-main.png",
  "/assets/templates/perfume-main.png",
  "/assets/templates/seasonal-sale-main.png",
  "/assets/templates/restaurant-main.png"
];

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-3 text-sm font-medium text-slate-600 sm:px-6 lg:px-8">
          {secondaryNav.map((item) => (
            <a
              key={item}
              href={
                item === "Featured"
                  ? "#featured"
                  : item === "Beauty" || item === "Food" || item === "Fashion"
                    ? `/categories/${item.toLowerCase()}`
                    : `/templates?q=${encodeURIComponent(item)}`
              }
              className="whitespace-nowrap rounded-full bg-slate-100 px-4 py-2 transition hover:bg-slate-950 hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 -z-20 grid grid-cols-2 gap-4 p-4 opacity-25 sm:grid-cols-3 lg:grid-cols-4 lg:p-8">
          {heroWall.map((src, index) => (
            <div
              key={src}
              className={`overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900 shadow-2xl ${
                index % 3 === 0 ? "translate-y-6" : index % 3 === 1 ? "-translate-y-2" : "translate-y-12"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(2,6,23,0.72),rgba(2,6,23,0.92)),radial-gradient(circle_at_top,#4338ca55,transparent_35%)]" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Find high-converting ad prompts for every campaign
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Search and customize AI prompts for product ads, ecommerce visuals, UGC scripts, Runway videos, and full-funnel campaigns.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
            <form className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                name="q"
                placeholder="Search by product, platform, audience, or campaign goal..."
                className="min-h-14 flex-1 rounded-full border border-white/10 bg-white px-6 text-slate-950 outline-none ring-indigo-300 focus:ring-2"
              />
              <button
                type="submit"
                formAction="/templates"
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-indigo-600 px-7 text-sm font-bold text-white transition hover:bg-indigo-500"
              >
                Find Prompts
              </button>
            </form>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <QuickFilterBlock title="Search by Platform" items={platformTags} />
              <QuickFilterBlock title="Search by Format" items={formatTags} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-5">
          {trustStats.map((item) => (
            <div key={item} className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <p className="text-sm font-semibold text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="featured" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Featured Templates"
            title="Browse a marketplace of campaign-ready prompts"
            description="Explore image prompts, Runway video prompts, storyboards, and copy-ready creative frameworks built for ad production."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTemplates.map((template) => (
              <TemplateCard key={template.slug} template={template} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Browse by Goal"
          title="Start with the campaign outcome you need"
          description="Jump straight into prompts built for launch moments, sales pushes, retargeting flows, UGC concepts, and ecommerce hero assets."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {browseGoals.map((goal) => {
            const href =
              goal.title === "Product Launch"
                ? "/templates?goal=Product+Launch"
                : goal.title === "Sales Campaign"
                  ? "/templates?goal=Sales"
                  : goal.title === "UGC Ad"
                    ? "/templates?format=UGC+Script"
                    : goal.title === "Ecommerce Hero"
                      ? "/templates?format=Ecommerce+Hero"
                      : goal.title === "Seasonal Sale"
                        ? "/templates?goal=Seasonal+Campaign"
                        : "/templates?goal=Retargeting";

            return (
              <Link
                key={goal.title}
                href={href}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img src={goal.image} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="p-7">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Campaign Goal</p>
                  <h3 className="mt-4 text-2xl font-bold text-slate-950">{goal.title}</h3>
                  <p className="mt-3 text-slate-600">
                    Browse templates and reference-based prompts tuned for {goal.title.toLowerCase()} workflows.
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Categories"
            title="Explore by campaign category"
            description="Browse beauty, food, and fashion creative systems with structured prompts, visual references, and reusable ad directions."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryCards.map((category) => (
              <Link
                key={category.title}
                href={`/categories/${categoryToSlug(category.title)}`}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img src={category.image} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="p-7">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">{category.title}</p>
                  <h3 className="mt-4 text-2xl font-bold text-slate-950">{category.title} Templates</h3>
                  <p className="mt-3 text-slate-600">
                    Explore product visuals, short ad scenes, and prompt structures for {category.title.toLowerCase()} brands.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="How It Works" title="From concept to production-ready prompt in minutes" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["Choose a template", "Browse by category, use case, or search intent to find a proven prompt structure."],
            ["Copy the prompt", "Use the image prompt for static visuals and the Runway prompt for video variations."],
            ["Customize and launch", "Replace product details, styling props, aspect ratios, and campaign messaging for your brand."]
          ].map(([title, description], index) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-lg font-bold text-indigo-700">
                {index + 1}
              </div>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 to-indigo-950 p-8 text-white shadow-2xl sm:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-200">Free Prompt Pack</p>
          <h2 className="mt-4 text-3xl font-bold">Get 20 free ad prompts</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            Join the list and get a starter pack of image prompts, Runway video prompts, and storyboard templates for ecommerce campaigns.
          </p>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="you@example.com"
              className="min-h-12 flex-1 rounded-full border border-white/10 bg-white px-5 text-slate-950 outline-none ring-indigo-300 focus:ring-2"
            />
            <a
              href="/downloads/free-ad-prompt-pack.md"
              className="inline-flex rounded-full bg-white px-6 py-3 font-bold text-slate-950"
            >
              Download Free Pack
            </a>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
              Feedback & Suggestions
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
              Share Your Thoughts
            </h2>
            <p className="mt-3 text-lg leading-8 text-slate-700">
              Questions, ideas, or improvements? Leave a comment below and help us keep refining the prompt library.
            </p>
          </div>

          <GiscusComments />
        </div>
      </section>
    </main>
  );
}

function QuickFilterBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-300">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item}
            href={`/templates?q=${encodeURIComponent(item)}`}
            className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-slate-950"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
