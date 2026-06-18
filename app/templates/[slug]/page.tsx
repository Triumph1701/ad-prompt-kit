import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CopyButton } from "@/components/CopyButton";
import GiscusComments from "@/components/GiscusComments";
import { TemplateCard } from "@/components/TemplateCard";
import { getPrimaryReferenceImage, getRelatedTemplates, getTemplateBySlug, categoryToSlug } from "@/lib/templates";
import { templates } from "@/data/templates";

type TemplatePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    return {};
  }

  const primaryImage = getPrimaryReferenceImage(template);

  return {
    title: template.title,
    description: `${template.shortDescription} Main reference image included with image prompt, Runway prompt, storyboard, camera notes, lighting notes, and prompt variations.`,
    keywords: [template.title, template.category, template.useCase, template.searchIntent, "Image Prompt", "Runway prompt", "AI prompt template", "ad creative", "ecommerce visual"],
    alternates: {
      canonical: `/templates/${template.slug}`
    },
    openGraph: {
      title: `${template.title} | Ad Prompt Kit`,
      description: template.shortDescription,
      url: `/templates/${template.slug}`,
      type: "article",
      images: [{
        url: primaryImage,
        width: 900,
        height: 640,
        alt: `${template.title} main reference image`
      }]
    },
    twitter: {
      card: "summary_large_image",
      title: `${template.title} | Ad Prompt Kit`,
      description: template.shortDescription,
      images: [primaryImage]
    }
  };
}

export default async function TemplateDetailPage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  const relatedTemplates = getRelatedTemplates(template);
  const primaryImage = getPrimaryReferenceImage(template);
  const storyboardText = template.storyboardScenes
    .map((scene, index) => `${index + 1}. ${scene}`)
    .join("\n");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: template.title,
    description: template.shortDescription,
    image: [primaryImage, ...template.referenceImages.filter((image) => image !== primaryImage)],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://adpromptkit.com/templates/${template.slug}`
    },
    author: {
      "@type": "Organization",
      name: "Ad Prompt Kit"
    },
    publisher: {
      "@type": "Organization",
      name: "Ad Prompt Kit",
      logo: {
        "@type": "ImageObject",
        url: "https://adpromptkit.com/logo.png"
      }
    },
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split('T')[0],
    about: {
      "@type": "Thing",
      name: template.category
    },
    keywords: `${template.searchIntent}, ${template.category}, ${template.useCase}, Image Prompt, Runway prompt`,
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: template.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    }
  };

  return (
    <main className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
            <Link
              href={`/categories/${categoryToSlug(template.category)}`}
              className="inline-flex rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700"
            >
              {template.category}
            </Link>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {template.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{template.shortDescription}</p>
            <p className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-4 text-sm font-semibold leading-6 text-indigo-800">
              Use the main reference image as the visual anchor for composition, lighting, color palette, product placement, and prompt interpretation.
            </p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Use case", template.useCase],
                ["Search intent", template.searchIntent],
                ["Aspect ratio", template.aspectRatio],
                ["Video duration", template.duration]
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <dt className="text-sm font-semibold text-slate-500">{label}</dt>
                  <dd className="mt-2 font-bold text-slate-950">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Use this template</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-950">Use this template</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Copy the Image Prompt, Runway Prompt, or storyboard and drop the template straight into your next campaign workflow.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <CopyButton text={template.midjourneyPrompt} label="Copy Image Prompt" />
                <CopyButton text={template.runwayPrompt} label="Copy Runway Prompt" />
                <CopyButton text={storyboardText} label="Copy Storyboard" />
              </div>
              <a
                href="/downloads/free-ad-prompt-pack.md"
                className="mt-4 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
              >
                Download Free Pack
              </a>
            </div>
          </div>
          <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl sm:p-5">
            <div className="grid gap-4">
              {template.referenceImages.slice(0, 3).map((src, index) => (
                <div key={src} className="relative overflow-hidden rounded-3xl">
                  <Image
                    src={src}
                    alt={`${template.title} ${index === template.primaryReferenceImageIndex ? "main reference image" : `supporting reference image ${index + 1}`}`}
                    width={1200}
                    height={index === 0 ? 900 : index === 1 ? 750 : 675}
                    className={`w-full object-cover ${index === 0 ? "aspect-[4/3]" : index === 1 ? "aspect-[16/10] ring-1 ring-indigo-100 shadow-lg shadow-indigo-100/40" : "aspect-[16/9]"}`}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:px-8">
        <PromptBlock title="Image Prompt" text={template.midjourneyPrompt} label="Copy Image Prompt" />
        <PromptBlock title="Runway Prompt" text={template.runwayPrompt} label="Copy Runway Prompt" />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Storyboard</p>
              <h2 className="mt-2 text-3xl font-bold">3 to 5 scene script</h2>
            </div>
            <CopyButton text={storyboardText} label="Copy Storyboard" />
          </div>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {template.storyboardScenes.map((scene, index) => (
              <li key={scene} className="rounded-2xl bg-slate-50 p-5">
                <span className="text-sm font-bold text-indigo-600">Scene {index + 1}</span>
                <p className="mt-2 leading-7 text-slate-700">{scene}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        <NotesCard title="Camera Notes" text={template.cameraNotes} />
        <NotesCard title="Lighting Notes" text={template.lightingNotes} />
        <NotesCard title="Motion Notes" text={template.motionNotes} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">Prompt Variations</h2>
            <ul className="mt-5 space-y-3">
              {template.promptVariations.map((variation) => (
                <li key={variation} className="rounded-2xl bg-slate-50 p-4 text-slate-700">
                  {variation}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">FAQ</h2>
            <div className="mt-5 space-y-4">
              {template.faqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl bg-slate-50 p-4" open>
                  <summary className="cursor-pointer font-bold text-slate-950">{faq.question}</summary>
                  <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-950">Related Templates</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedTemplates.map((relatedTemplate) => (
            <TemplateCard key={relatedTemplate.slug} template={relatedTemplate} />
          ))}
        </div>
      </section>

      <GiscusComments />
    </main>
  );
}

function PromptBlock({ title, text, label }: { title: string; text: string; label: string }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <CopyButton text={text} label={label} />
      </div>
      <p className="mt-5 rounded-2xl bg-slate-50 p-5 leading-8 text-slate-700">{text}</p>
    </section>
  );
}

function NotesCard({ title, text }: { title: string; text: string }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-4 leading-7 text-slate-600">{text}</p>
    </section>
  );
}
