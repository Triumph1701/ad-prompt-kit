"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";

const categories = ["Beauty", "Food", "Fashion", "General"];
const platforms = ["Image Prompt", "Runway"];
const goals = ["product ad", "social media post", "ecommerce hero image", "short video ad"];
const styles = ["clean SaaS-style", "luxury editorial", "UGC natural", "bold promotional", "minimal premium"];

export function PromptGenerator() {
  const [productType, setProductType] = useState("skincare serum");
  const [category, setCategory] = useState("Beauty");
  const [style, setStyle] = useState("luxury editorial");
  const [platform, setPlatform] = useState("Image Prompt");
  const [goal, setGoal] = useState("product ad");

  const prompt = useMemo(() => {
    const base =
      `${productType} ${goal} for the ${category.toLowerCase()} category, ${style} visual direction, professional advertising composition, clear product focus, readable label, soft gradient background, polished commercial lighting, platform-ready marketing creative`;

    if (platform === "Image Prompt") {
      return `${base}, realistic product photography, premium props, conversion-focused layout --ar ${goal.includes("short video") ? "9:16" : "4:5"} --v 6`;
    }

    return `${base}. Create a short cinematic sequence with a strong opening hook, smooth product reveal, close-up detail shot, subtle motion, and final CTA frame. Keep the camera movement clean and the brand tone professional.`;
  }, [category, goal, platform, productType, style]);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <form className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Product type</span>
            <input
              value={productType}
              onChange={(event) => setProductType(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-indigo-500 focus:ring-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-indigo-500 focus:ring-2"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Style</span>
            <select
              value={style}
              onChange={(event) => setStyle(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-indigo-500 focus:ring-2"
            >
              {styles.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Platform</span>
            <select
              value={platform}
              onChange={(event) => setPlatform(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-indigo-500 focus:ring-2"
            >
              {platforms.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Output goal</span>
            <select
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-indigo-500 focus:ring-2"
            >
              {goals.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
      </form>
      <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-300">
              Generated Prompt
            </p>
            <h2 className="mt-3 text-2xl font-bold">Ready for {platform}</h2>
          </div>
          <CopyButton text={prompt} label="Copy prompt" className="bg-white text-slate-950 hover:bg-slate-100" />
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="whitespace-pre-wrap text-base leading-8 text-slate-100">{prompt}</p>
        </div>
      </section>
    </div>
  );
}
