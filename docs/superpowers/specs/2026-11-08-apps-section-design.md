# Apps Section Design

Date: 2026-11-08  
Status: Approved for planning  
First app: Dumbbell (`dumbbell`)

## Goal

Add an Apps section to DesigningSystems.dev so launched products have:

1. A website-themed index of apps
2. A product marketing homepage themed to each app
3. A privacy policy page
4. An instructions page that teaches how the app was built

## Routes & themes

| Route | Theme | Purpose |
|---|---|---|
| `/app` | Website theme | Index of apps; each card exposes 5 actions |
| `/app/[slug]` | App theme | Product marketing homepage |
| `/app/[slug]/privacy` | App theme | Privacy policy rendered from Markdown |
| `/app/[slug]/instructions` | Website theme | Rebuild prompt, steps, and reference images |

### `/app` card actions

For each app card:

1. App home → `/app/[slug]`
2. Privacy → `/app/[slug]/privacy`
3. Instructions → `/app/[slug]/instructions`
4. GitHub → external URL from config
5. Play Store → external URL from config (dummy until real link is provided)

## Content model

Follow the existing blog/config pattern.

### Registry

`apps.config.ts` holds per-app metadata:

- `slug` (e.g. `dumbbell`)
- `name`, `tagline`, `description`
- `status` (e.g. launched / coming soon)
- `githubUrl`
- `playStoreUrl` (dummy placeholder allowed)
- theme tokens: background, surface, accent, text, muted text, fonts
- feature bullets for the marketing page
- screenshot filenames
- optional sort / published date

### Content folder

`public/apps/<slug>/`:

- `privacy.md`
- `prompt.md` (rebuild prompt written by reverse-engineering the app)
- `screenshots/` (copied from the Flutter app source folder)
- optional longer copy files later if needed

### Loader

`src/lib/apps.ts`:

- `getAllApps()`
- `getAppBySlug(slug)`
- helpers to read `privacy.md` / `prompt.md` and resolve screenshot public paths

Adding a second app = one config entry + one content folder.

## Page UI

### `/app` (website theme)

Same visual language as Blog / Companies:

- page title and short intro
- one card per registered app
- card shows name + tagline
- five clear actions (home, privacy, instructions, GitHub, Play Store)

### `/app/dumbbell` (app theme)

Product marketing page using Dumbbell’s dark + chartreuse identity from `app_1` visuals:

- hero: product name, one-liner, Play Store CTA (dummy until replaced)
- feature highlights grounded in the real product: free, offline-first, no account, sets/reps/weight, workout timer, history/progress, local export/import
- screenshot gallery from `public/apps/dumbbell/screenshots/`
- secondary links: Privacy · Instructions · GitHub

### `/app/dumbbell/privacy` (app theme)

Same dark app shell; readable Markdown render of `privacy.md` (sourced from the Flutter app privacy policy).

### `/app/dumbbell/instructions` (website theme)

Normal site chrome. Sections:

1. Overview of what was built
2. Rebuild prompt (`prompt.md`, reverse-engineered from app code/docs)
3. Step-by-step build guide derived from plan + implementation
4. Reference images from the screenshot folder

## Architecture

### Next.js routes

- `src/app/app/page.tsx`
- `src/app/app/[slug]/page.tsx`
- `src/app/app/[slug]/privacy/page.tsx`
- `src/app/app/[slug]/instructions/page.tsx`

Static segment `app` takes precedence over `[category]`, so chapter routes are unaffected.

### Rendering

- Marketing and privacy pages apply per-app CSS variables from theme tokens
- Instructions page uses the existing website layout/theme
- Markdown rendered with a small shared MD helper for privacy + instructions
- Screenshots served as static files under `public/apps/...`

### Discovery

- Add Apps to the footer nav
- Add Apps to the navbar
- Include app routes in sitemap + page metadata / Open Graph

## First app: Dumbbell

Source material: `/Users/kartisharma/Documents/flutter_apps/app_1`

- Product name: Dumbbell
- Slug: `dumbbell`
- Visual direction: near-black surfaces, chartreuse/lime accent, bold sans-serif, fitness photography references in `screenshot/`
- Privacy: copy from `workout_app/assets/legal/privacy-policy.md`
- Instructions/prompt: author by reverse-engineering plan, visuals, and app implementation (no separate prompt file exists today)
- Play Store: dummy URL for now; real URL swapped later in config
- GitHub: URL from config when available; otherwise “Coming soon” / disabled action

## Edge cases

- Unknown slug → 404
- Missing Play Store or GitHub URL → that action only shows disabled / “Coming soon”
- Missing screenshot files → omit gallery items rather than break the page
- Missing `privacy.md` or `prompt.md` → 404 for that subpage

## Out of scope (v1)

- In-app demos / embedded Flutter web
- Auth, analytics, or crash reporting on app pages
- Hosting APK downloads on this site
- Multi-language content
- Fully custom React page per app (theme tokens + shared templates instead)

## Success criteria

- `/app` lists Dumbbell with five working actions
- `/app/dumbbell` feels like the product (dark + chartreuse marketing page)
- `/app/dumbbell/privacy` renders the real privacy policy in the app theme
- `/app/dumbbell/instructions` uses the website theme and includes prompt + steps + reference images
- A second app can be added without new route code, only config + content
