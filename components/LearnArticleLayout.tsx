import Link from "next/link";

type LearnArticleLayoutProps = {
  title: string;
  intro: string;
  children: React.ReactNode;
};

export function LearnArticleLayout({ title, intro, children }: LearnArticleLayoutProps) {
  return (
    <main className="bg-slate-50">
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/learn" className="text-sm font-semibold text-indigo-600">
          Back to Learn
        </Link>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">{intro}</p>
        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600">
          {children}
        </div>
        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">Turn the guide into usable prompts</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Browse the template library for ready-made structures, generate a prompt inside the local builder, or grab the free starter pack for campaign examples.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/templates"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Browse Templates
            </Link>
            <Link
              href="/generator"
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-950"
            >
              Open Generator
            </Link>
            <a
              href="/downloads/free-ad-prompt-pack.md"
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-950"
            >
              Download Free Pack
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
