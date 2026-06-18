# Ad Prompt Kit

Ad Prompt Kit is a Next.js template library for advertising, ecommerce, and social media prompt workflows. It includes a static library of 20 prompt templates, SEO-friendly template detail pages, category pages, and a local prompt generator.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static TypeScript data file, no database

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Project Structure

- `app/` - App Router pages, SEO files, and global styles
- `components/` - Shared UI components
- `data/templates.ts` - Static prompt template library
- `lib/templates.ts` - Helper functions for filtering and lookup

## Notes

The first version uses placeholder reference image URLs and local prompt generation only. There is no login, payment, API call, database, or video hosting.
