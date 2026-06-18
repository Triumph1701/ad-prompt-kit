"use client";

import { useMemo, useState } from "react";
import { categories, type PromptTemplate } from "@/data/templates";
import {
  formatOptions,
  goalOptions,
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
  const [category, setCategory] = useState("All");
  const [useCase, setUseCase] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [format, setFormat] = useState("All");
  const [goal, setGoal] = useState("All");
  const [query, setQuery] = useState("");

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return templates.filter((template) => {
      const searchableText = [
        template.title,
        template.category,
        template.useCase,
        template.searchIntent,
        template.shortDescription,
        template.midjourneyPrompt,
        template.runwayPrompt
      ]
        .join(" ")
        .toLowerCase();

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
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_170px_220px_170px_190px_190px]">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Keyword search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search serum, UGC, ecommerce..."
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-indigo-500 transition focus:ring-2"
            />
          </label>
          <FilterSelect label="Category" value={category} onChange={setCategory} options={["All", ...categories]} />
          <FilterSelect label="Use case" value={useCase} onChange={setUseCase} options={["All", ...useCases]} />
          <FilterSelect label="Platform" value={platform} onChange={setPlatform} options={[...platformOptions]} />
          <FilterSelect label="Format" value={format} onChange={setFormat} options={[...formatOptions]} />
          <FilterSelect label="Goal" value={goal} onChange={setGoal} options={[...goalOptions]} />
        </div>
      </div>
      <p className="mt-6 text-sm font-medium text-slate-600">
        Showing {filteredTemplates.length} template{filteredTemplates.length === 1 ? "" : "s"}
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.slug} template={template} />
        ))}
      </div>
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
