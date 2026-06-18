import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Explore Free, Pro Pack, and Agency Pack prompt collections for ecommerce, social ads, UGC scripts, and campaign-ready AI creative workflows."
};

const tiers = [
  {
    name: "Free",
    price: "$0",
    features: [
      "20 starter prompts",
      "Browse free templates",
      "Use prompt generator",
      "Download free pack"
    ],
    cta: "Start Free",
    href: "/generator"
  },
  {
    name: "Pro Pack",
    price: "$19",
    features: [
      "100 premium ad prompts",
      "Image prompts",
      "Runway video prompts",
      "Storyboard templates",
      "Ecommerce campaign prompts"
    ],
    cta: "Get Pro Pack",
    href: "/downloads/free-ad-prompt-pack.md"
  },
  {
    name: "Agency Pack",
    price: "$49",
    features: [
      "300+ prompt templates",
      "Multi-platform campaign prompts",
      "UGC scripts",
      "Retargeting prompts",
      "Launch campaign frameworks"
    ],
    cta: "Join Waitlist",
    href: "mailto:hello@adpromptkit.com?subject=Agency%20Pack%20Waitlist"
  }
];

const faqs = [
  {
    q: "Do I need an API key?",
    a: "No. The site is built as a static prompt library and local prompt generator. You can browse, copy, and adapt templates without connecting an API."
  },
  {
    q: "Can I use the prompts for client work?",
    a: "Yes. The templates are designed for marketers, founders, ecommerce operators, and agencies producing campaign assets for real brands."
  },
  {
    q: "Are these prompts only for image generation?",
    a: "No. The library includes Image Prompts, Runway video prompts, storyboard structures, UGC-style flows, and campaign-ready ad concepts."
  },
  {
    q: "Will there be a paid version?",
    a: "Yes. The Pricing page previews future Pro and Agency packs while the current site stays free to browse and use."
  }
];

export default function PricingPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Pricing</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Choose the prompt library that fits your workflow
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Start with the free library today, then move into larger packs when you need more campaign coverage, more formats, and more conversion-ready prompt systems.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <section key={tier.name} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">{tier.name}</p>
              <h2 className="mt-4 text-4xl font-bold text-slate-950">{tier.price}</h2>
              <ul className="mt-6 space-y-3 text-slate-600">
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Link
                href={tier.href}
                className="mt-8 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {tier.cta}
              </Link>
            </section>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">FAQ</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-2xl bg-slate-50 p-5" open>
                <summary className="cursor-pointer font-semibold text-slate-950">{faq.q}</summary>
                <p className="mt-3 leading-7 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
