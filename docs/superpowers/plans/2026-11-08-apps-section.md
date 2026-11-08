# Apps Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/app` index plus per-app marketing, privacy, and instructions pages, starting with Dumbbell.

**Architecture:** Config registry (`apps.config.ts`) + content under `public/apps/<slug>/`, loaded by `src/lib/apps.ts`. Shared Next.js routes under `src/app/app/`. Marketing + privacy use per-app CSS variables; index + instructions use the existing website chrome.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind, Framer Motion (existing), small local Markdown helper (no new MD dependency unless needed).

**Spec:** `docs/superpowers/specs/2026-11-08-apps-section-design.md`

## Global Constraints

- First slug is exactly `dumbbell`
- Routes: `/app`, `/app/[slug]`, `/app/[slug]/privacy`, `/app/[slug]/instructions`
- Themes: `/app` + instructions = website theme; marketing + privacy = app theme
- Play Store may be a dummy URL; missing GitHub/Play Store → that action only is disabled / “Coming soon”
- Unknown slug or missing required MD → 404
- Source visuals/privacy from `/Users/kartisharma/Documents/flutter_apps/app_1` (copy into repo; do not read that path at runtime)
- Dumbbell theme tokens from app design: bg `#10110F`, surface `#1C1E1A`, accent `#D5FF3F`, text `#F5F5EF`, muted `#A8ACA0`
- Follow existing page patterns (`companies`, navbar, footer, sitemap, `pageMetadata`)

## Review Focus

- Unknown slug returns 404 (not empty marketing shell)
- Missing `privacy.md` / `prompt.md` returns 404 for that subpage only
- Card actions with empty external URLs render disabled / Coming soon, not broken links
- Screenshot filenames in config that are absent on disk are omitted, page still renders
- Static `/app` does not collide with `[category]` chapter routes

## File map

| File | Responsibility |
|---|---|
| `apps.config.ts` | App registry + theme + feature bullets + screenshot names + URLs |
| `public/apps/dumbbell/privacy.md` | Privacy policy content |
| `public/apps/dumbbell/prompt.md` | Rebuild prompt |
| `public/apps/dumbbell/instructions.md` | Step-by-step build guide body |
| `public/apps/dumbbell/screenshots/*` | Reference / marketing images |
| `src/lib/apps.ts` | Load apps, MD, screenshots |
| `src/lib/markdown.ts` | Minimal MD → safe HTML for headings/paragraphs/lists/code |
| `src/components/apps/*` | Shared app UI pieces (index cards, themed shell, MD body) |
| `src/app/app/**` | Routes |
| `src/lib/nav.ts`, `Navbar.tsx`, `sitemap.ts` | Discovery |

---

### Task 1: Config, content assets, and apps loader

**Files:**
- Create: `apps.config.ts`
- Create: `public/apps/dumbbell/privacy.md` (copy from Flutter `assets/legal/privacy-policy.md`)
- Create: `public/apps/dumbbell/prompt.md` (reverse-engineered rebuild prompt)
- Create: `public/apps/dumbbell/instructions.md` (build steps)
- Create: `public/apps/dumbbell/screenshots/` (copy PNGs from `app_1/screenshot`, rename to stable names)
- Create: `src/lib/apps.ts`
- Create: `src/lib/markdown.ts`

**Interfaces:**
- Produces:
  - `export interface AppTheme { background: string; surface: string; accent: string; text: string; muted: string }`
  - `export interface AppMeta { slug: string; name: string; tagline: string; description: string; status: 'launched' | 'coming-soon'; githubUrl: string; playStoreUrl: string; theme: AppTheme; features: string[]; screenshots: string[]; publishedAt?: string }`
  - `export interface AppRecord extends AppMeta { privacyMarkdown: string | null; promptMarkdown: string | null; instructionsMarkdown: string | null; screenshotPaths: string[] }`
  - `getAllApps(): AppRecord[]`
  - `getAppBySlug(slug: string): AppRecord | undefined`
  - `renderMarkdown(md: string): string`

- [ ] **Step 1: Add Dumbbell content under `public/apps/dumbbell/`**

Copy privacy MD. Rename screenshots to `ref-01.png` … `ref-04.png`. Write `prompt.md` and `instructions.md` by reverse-engineering plan/visuals/version-one design (offline-first workout log, no account, local storage, lime/dark theme).

- [ ] **Step 2: Add `apps.config.ts` with Dumbbell entry**

Use exact theme hex values from Global Constraints. `playStoreUrl` = dummy `https://play.google.com/store/apps/details?id=com.example.dumbbell`. `githubUrl` empty string until known. Features from product truth (free, offline, no login, sets/reps/weight, timer, history/progress, CSV export).

- [ ] **Step 3: Implement `src/lib/markdown.ts` and `src/lib/apps.ts`**

`getAllApps` reads config, loads MD files if present, maps screenshot filenames to `/apps/<slug>/screenshots/<file>` only when the file exists. `getAppBySlug` filters that list.

- [ ] **Step 4: Verify loader**

Run: `pnpm exec tsx -e "const { getAllApps, getAppBySlug } = require('./src/lib/apps.ts'); const apps = getAllApps(); if (!apps.length) throw new Error('no apps'); const d = getAppBySlug('dumbbell'); if (!d?.privacyMarkdown) throw new Error('missing privacy'); if (!d.promptMarkdown) throw new Error('missing prompt'); console.log('ok', d.screenshotPaths.length)"`

Expected: prints `ok` and a screenshot count ≥ 1. Adjust import style if tsx needs ESM import.

- [ ] **Step 5: Commit**

```bash
git add apps.config.ts public/apps src/lib/apps.ts src/lib/markdown.ts
git commit -m "Add apps config, Dumbbell content, and apps loader."
```

---

### Task 2: `/app` index + nav discovery

**Files:**
- Create: `src/app/app/page.tsx`
- Create: `src/app/app/AppsContent.tsx`
- Create: `src/components/apps/AppIndexCard.tsx`
- Modify: `src/lib/nav.ts` (add Apps to `footerNav.learn`)
- Modify: `src/components/layout/Navbar.tsx` (add Apps link beside Companies)
- Modify: `src/app/sitemap.ts` (include `/app` and per-app routes)

**Interfaces:**
- Consumes: `getAllApps()`, `AppRecord` from Task 1
- Produces: `/app` page with five card actions

- [ ] **Step 1: Build website-themed `/app` page modeled on Companies**

Card shows name + tagline. Five actions: Home, Privacy, Instructions, GitHub, Play Store. Internal links always work. External: if URL empty → disabled “Coming soon”; else `target="_blank" rel="noopener noreferrer"`.

- [ ] **Step 2: Wire navbar, footer, sitemap**

Navbar center links gain Apps → `/app`. Footer learn list gains Apps. Sitemap adds `/app` plus for each app: `/app/{slug}`, `/privacy`, `/instructions`.

- [ ] **Step 3: Verify**

Run: `pnpm build`  
Expected: success; routes include `/app`.

- [ ] **Step 4: Commit**

```bash
git add src/app/app src/components/apps src/lib/nav.ts src/components/layout/Navbar.tsx src/app/sitemap.ts
git commit -m "Add /app index and Apps nav discovery."
```

---

### Task 3: App-themed marketing + privacy pages

**Files:**
- Create: `src/components/apps/AppThemeShell.tsx`
- Create: `src/components/apps/MarkdownArticle.tsx`
- Create: `src/app/app/[slug]/page.tsx`
- Create: `src/app/app/[slug]/AppHomeContent.tsx`
- Create: `src/app/app/[slug]/privacy/page.tsx`
- Create: `src/app/app/[slug]/privacy/PrivacyContent.tsx`

**Interfaces:**
- Consumes: `getAppBySlug`, `getAllApps`, `renderMarkdown`
- Produces: themed marketing homepage + privacy page; `generateStaticParams` from `getAllApps()`

- [ ] **Step 1: Implement `AppThemeShell`**

Apply CSS variables from `app.theme` on a full-page dark shell. Keep a way back to `/app`. Do not force the global white website shell for these pages.

- [ ] **Step 2: Marketing page `/app/[slug]`**

Hero (name, tagline/description, Play Store CTA), feature list, screenshot gallery, secondary links (Privacy, Instructions, GitHub with same disabled rules). `notFound()` if slug missing.

- [ ] **Step 3: Privacy page**

Same shell. Render `privacyMarkdown` via `MarkdownArticle`. `notFound()` if app or privacy MD missing.

- [ ] **Step 4: Verify**

Run: `pnpm build`  
Expected: success; `/app/dumbbell` and `/app/dumbbell/privacy` in build output.

- [ ] **Step 5: Commit**

```bash
git add src/components/apps src/app/app
git commit -m "Add Dumbbell marketing and privacy pages."
```

---

### Task 4: Website-themed instructions page

**Files:**
- Create: `src/app/app/[slug]/instructions/page.tsx`
- Create: `src/app/app/[slug]/instructions/InstructionsContent.tsx`

**Interfaces:**
- Consumes: `getAppBySlug`, `renderMarkdown`, screenshot paths
- Produces: website-themed instructions with prompt + steps + reference images

- [ ] **Step 1: Build instructions page with Navbar + Footer**

Sections: Overview (from app description), Rebuild prompt (`promptMarkdown` in a readable block), Steps (`instructionsMarkdown`), Reference images (screenshot gallery). `notFound()` if app or prompt MD missing.

- [ ] **Step 2: Verify**

Run: `pnpm build`  
Expected: success including `/app/dumbbell/instructions`. Spot-check that unknown slug path 404s via Next `notFound`.

- [ ] **Step 3: Commit**

```bash
git add src/app/app/[slug]/instructions
git commit -m "Add website-themed app instructions page."
```

---

### Task 5: Final polish pass

**Files:**
- Modify as needed: SEO metadata on all four page types via `pageMetadata`
- Modify as needed: copy/spacing on Dumbbell marketing page

- [ ] **Step 1: Add metadata for index + slug pages**

Titles/descriptions unique per page; path-correct OG where easy.

- [ ] **Step 2: Final build**

Run: `pnpm build`  
Expected: clean success.

- [ ] **Step 3: Commit if anything changed**

```bash
git add -A
git commit -m "Polish Apps section SEO and marketing copy."
```
