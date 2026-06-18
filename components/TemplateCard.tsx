import Link from "next/link";
import type { PromptTemplate } from "@/data/templates";
import { categoryToSlug, getPrimaryReferenceImage } from "@/lib/templates";

type TemplateCardProps = {
  template: PromptTemplate;
};

export function TemplateCard({ template }: TemplateCardProps) {
  const primaryImage = getPrimaryReferenceImage(template);
  const valueTags = ["Image Prompt", "Runway Prompt", "Storyboard"];

  return (
    <article className="group rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/templates/${template.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-slate-100">
          <img
            src={primaryImage}
            alt={`${template.title} main reference image`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {template.category}
          </span>
          <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-500">{template.aspectRatio}</span>
        </div>
        <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-950">
          {template.title}
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {valueTags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {template.shortDescription}
        </p>
      </Link>
      <div className="mt-5 flex items-center justify-between gap-3 text-sm">
        <Link
          href={`/categories/${categoryToSlug(template.category)}`}
          className="font-medium text-slate-600 hover:text-slate-950"
        >
          Browse {template.category}
        </Link>
        <Link
          href={`/templates/${template.slug}`}
          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          View template
        </Link>
      </div>
    </article>
  );
}
