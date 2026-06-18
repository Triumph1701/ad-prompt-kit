import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://adpromptkit.com"),
  title: {
    default: "Ad Prompt Kit - AI Prompt Templates for Ads, Ecommerce, and Social",
    template: "%s | Ad Prompt Kit"
  },
  description:
    "Professional AI prompt templates for image prompts and Runway videos. Create product ads, ecommerce visuals, social content, and video campaigns with ready-to-use prompts, storyboards, and detailed shot notes.",
  keywords: ["AI prompts", "image prompts", "Runway prompts", "ad templates", "ecommerce visuals", "social media marketing", "product photography", "video ads", "beauty ads", "food marketing", "fashion campaigns"],
  authors: [{ name: "Ad Prompt Kit" }],
  creator: "Ad Prompt Kit",
  publisher: "Ad Prompt Kit",
  openGraph: {
    title: "Ad Prompt Kit - AI Prompt Templates for Marketing Teams",
    description:
      "Browse professional image prompts and Runway prompt templates for product ads, ecommerce hero images, social reels, and video campaigns.",
    url: "https://adpromptkit.com",
    siteName: "Ad Prompt Kit",
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ad Prompt Kit - AI Prompt Templates for Ads & Ecommerce",
    description: "Professional image prompts and Runway prompts for product ads, ecommerce visuals, and social media campaigns.",
    creator: "@adpromptkit"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

const navItems = [
  { href: "/templates", label: "Explore" },
  { href: "/templates", label: "Templates" },
  { href: "/generator", label: "Generator" },
  { href: "/learn", label: "Learn" },
  { href: "/pricing", label: "Pricing" }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-950 antialiased">
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-lg font-bold tracking-tight">
              Ad Prompt Kit
            </Link>
            <div className="flex items-center gap-5 text-sm font-medium text-slate-700">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-slate-950">
                  {item.label}
                </Link>
              ))}
              <Link
                href="/generator"
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Start Free
              </Link>
            </div>
          </nav>
        </header>
        {children}
        <footer className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-slate-600 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <p className="font-semibold text-slate-950">Ad Prompt Kit</p>
              <p className="mt-2 max-w-sm">
                Prompt templates for marketers, founders, creative teams, and ecommerce operators.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/templates">Template Library</Link>
              <Link href="/generator">Prompt Generator</Link>
              <Link href="/learn">Learn</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/downloads/free-ad-prompt-pack.md">Free Pack</Link>
            </div>
            <div className="text-slate-500">
              Built for campaign ideation, product shots, short-form ads, and SEO-friendly creative workflows.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
