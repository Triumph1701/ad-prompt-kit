"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { categories, type PromptTemplate } from "@/data/templates";
import {
  formatOptions,
  goalOptions,
  getTemplateSearchText,
  matchesFormat,
  matchesGoal,
  matchesPlatform,
  platformOptions,
  useCases
} from "@/lib/templates";
import { TemplateCard } from "@/components/TemplateCard";

type TemplateFiltersProps = {
  templates: PromptTemplate[];
};

export function TemplateFilters({ templates }: TemplateFiltersProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [category, setCategory] = useState(searchParams.get("category") ?? "All");
  const [useCase, setUseCase] = useState(searchParams.get("useCase") ?? "All");
  const [platform, setPlatform] = useState(searchParams.get("platform") ?? "All");
  const [format, setFormat] = useState(searchParams.get("format") ?? "All");
  const [goal, setGoal] = useState(searchParams.get("goal") ?? "All");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  function updateParams(next: {
    q?: string;
    category?: string;
    useCase?: string;
    platform?: string;
    format?: string;
    goal?: string;
  }) {
    const params = new URLSearchParams(searchParams.toString());
    const entries = { q: query, category, useCase, platform, format, goal, ...next };

    for (const [key, value] of Object.entries(entries)) {
      if (!value || value === "All") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return templates.filter((template) => {
      const searchableText = getTemplateSearchText(template);

      const matchesCategory = category === "All" || template.category === category;
      const matchesUseCase = useCase === "All" || template.useCase === useCase;
      const matchesSelectedPlatform = matchesPlatform(template, platform);
      const matchesSelectedFormat = matchesFormat(template, format);
      const matchesSelectedGoal = matchesGoal(template, goal);
      const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

      return (
        matchesCategory &&
        matchesUseCase &&
        matchesSelectedPlatform &&
        matchesSelectedFormat &&
        matchesSelectedGoal &&
        matchesQuery
      );
    });
  }, [category, format, goal, platform, query, templates, useCase]);

  return (
    <div>
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(260px,1.45fr)_170px_220px_170px] xl:grid-cols-[minmax(320px,1.55fr)_170px_220px_170px_190px_190px]">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Keyword search</span>
            <input
              value={query}
              onChange={(event) => {
                const nextValue = event.target.value;
                setQuery(nextValue);
                updateParams({ q: nextValue });
              }}
              placeholder="Search serum, UGC, ecommerce..."
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-indigo-500 transition focus:ring-2"
            />
          </label>
          <FilterSelect
            label="Category"
            value={category}
            onChange={(value) => {
              setCategory(value);
              updateParams({ category: value });
            }}
            options={["All", ...categories]}
          />
          <FilterSelect
            label="Use case"
            value={useCase}
            onChange={(value) => {
              setUseCase(value);
              updateParams({ useCase: value });
            }}
            options={["All", ...useCases]}
          />
          <FilterSelect
            label="Platform"
            value={platform}
            onChange={(value) => {
              setPlatform(value);
              updateParams({ platform: value });
            }}
            options={[...platformOptions]}
          />
          <FilterSelect
            label="Format"
            value={format}
            onChange={(value) => {
              setFormat(value);
              updateParams({ format: value });
            }}
            options={[...formatOptions]}
          />
          <FilterSelect
            label="Goal"
            value={goal}
            onChange={(value) => {
              setGoal(value);
              updateParams({ goal: value });
            }}
            options={[...goalOptions]}
          />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-600">
        Showing {filteredTemplates.length} template{filteredTemplates.length === 1 ? "" : "s"}
        </p>
        <p className="text-sm text-slate-500">Use search first, then narrow by filters.</p>
      </div>
      {filteredTemplates.length > 0 ? (
        <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">No matching prompt templates found</h2>
          <p className="mt-3 text-slate-600">
            Try searching by product type, platform, campaign goal, or ad format.
          </p>
          <Link
            href="/templates"
            className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            View all templates
          </Link>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-indigo-500 transition focus:ring-2"
      >
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </label>
  );
}
