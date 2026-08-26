---
name: obsidian-blog
description: Use when adding an Obsidian Excalidraw reel as a DesigningSystems.dev blog, when the user names obsidian-blog plus a file, or says add this from Excalidraw/reels.
---

# Obsidian blog import

Turn one Obsidian Excalidraw file into a site blog. Inputs: **name** (optional title) and **file** (filename or path).

## Defaults

| Item | Value |
|------|--------|
| Vault | `~/Documents/obsidian/Excalidraw/reels/` |
| Site | workspace with `blogs.config.ts` (this repo / a `main` worktree). Do not checkout `main` in a `ks/seo` working tree. |
| Dest | `public/blogs/<original-filename>.excalidraw` |
| Date | today's date (`YYYY-MM-DD`) |
| Tags | `['system-design']` |
| Read time | `2` |

Do **not** commit or push unless the user asks.

## Resolve the file

1. If `file` is absolute and exists, use it.
2. Else search `~/Documents/obsidian/Excalidraw/reels/` then `~/Documents/obsidian/Excalidraw/` for that name, with or without `.excalidraw` / `.excalidraw.md`.
3. If multiple matches, pick the reels folder. If none, stop and list close matches.

## Copy

- Raw `.excalidraw` JSON (`"type": "excalidraw"` at top): `cp` as-is. Keep the original basename.
- Obsidian wrapper `.excalidraw.md`: extract the ```json fence to a `.excalidraw` file (same basename, no `.md`).
- Validate with `python3 -c "import json; json.load(open(dest))"`.

## Slug (must match `src/lib/blogs.ts`)

From the destination basename without `.excalidraw`:

```
lowercase → spaces to `-` → non `[a-z0-9-]` to `-` → collapse `-` → trim `-`
```

Config key = that slug. URL = `/blog/<slug>`.

## Metadata (`blogs.config.ts`)

Add an entry keyed by slug:

- **title**: user `name` if given, else Title Case from the filename (keep known terms: Fan-Out, URL, S3).
- **description**: 1–2 sentences from diagram `"text"` fields. Skip lorem, “follow me”, “comment link”. Prefer the problem/solution lines.
- Do not rewrite unrelated existing entries.

## Related (`related.config.ts`)

Add `'blog/<slug>'` with 2–3 links to existing chapters/blogs (real hrefs from this file / `chapters.config.ts`). Add one backlink from the closest existing key when it already has a list.

## Verify

```bash
./node_modules/.bin/tsx -e "import { getBlogPostBySlug, getAllBlogPosts } from './src/lib/blogs.ts'; console.log(getBlogPostBySlug('SLUG')); console.log(getAllBlogPosts().length)"
```

Confirm slug, title, `diagramPath`, and post count increased by 1.

## Report

Title, slug URL, source path, dest path, related links, commit/push status.

## Example

User: `obsidian-blog` + file `Circuit Breaker.excalidraw`

→ `public/blogs/Circuit Breaker.excalidraw`, slug `circuit-breaker`, `/blog/circuit-breaker`

## Mistakes

| Wrong | Right |
|-------|--------|
| Edit `ks/seo` in place | Isolated `main` worktree if another agent owns `ks/seo` |
| Commit/push unasked | Stop after files + verify |
| Invent related hrefs | Only existing routes |
| Rename dest to slug | Keep original filename |
| Change SEO slug aliases | New posts use the generated slug only |
