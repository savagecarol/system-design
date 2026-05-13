# Dark Mode Design Spec

**Date:** 2026-05-13  
**Branch:** theme  
**Status:** Approved

---

## Overview

Add a dark mode toggle to the navbar that switches the entire site to a pure-black, coding-website aesthetic. Theme persists in localStorage. Excalidraw reading diagrams follow the theme dynamically; the notes drawing canvas always stays light.

---

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Theme library | `next-themes` | Handles SSR flash prevention and localStorage automatically |
| Toggle style | Pill switch (iOS-style) | Moon 🌙 left in light, sun ☀️ right in dark; brand indigo track when active |
| Dark palette | Pure black (`neutral` scale) | Coding website aesthetic, zero color cast |
| Notes canvas | Always light | Drawing on dark canvas is disorienting; white bg is safer for freehand notes |
| Excalidraw viewer | Follows theme | `theme` prop is dynamic; bg switches to `#111111` in dark |

---

## Architecture

### Dependency

Add `next-themes` to `package.json`.

### ThemeProvider

New file: `src/components/ui/ThemeProvider.tsx`

- Client component wrapping `next-themes` `ThemeProvider`
- `attribute="class"` — toggles `dark` class on `<html>` (Tailwind `darkMode: "class"` already expects this)
- `defaultTheme="light"`
- `enableSystem={false}` — manual toggle only, no OS preference
- localStorage key: `theme` (next-themes default)

### Root layout

`src/app/layout.tsx`:
- Wrap children in `ThemeProvider`
- Add `suppressHydrationWarning` to `<html>` — suppresses expected SSR/client mismatch when next-themes sets the class

### ThemeToggle

New file: `src/components/ui/ThemeToggle.tsx`

- Client component, calls `useTheme()` from `next-themes`
- Reads `resolvedTheme` to determine current state
- 48×26px pill, CSS `transition` on track color (0.2s ease) and thumb position
- Light mode: gray track (`#e2e8f0`), moon 🌙 thumb left-aligned
- Dark mode: brand-500 (`#6366f1`) track, sun ☀️ thumb right-aligned
- Placed in `Navbar.tsx` between `PresenceCounter` and `AuthButton`

### Excalidraw viewer

`src/components/chapter/ExcalidrawViewer.tsx`:
- Import `useTheme` from `next-themes`
- Pass `theme={resolvedTheme === 'dark' ? 'dark' : 'light'}` to `<Excalidraw>`
- Pass `viewBackgroundColor={resolvedTheme === 'dark' ? '#111111' : '#f8fafc'}`

### Notes canvas

`src/components/notes/NotesCanvas.tsx`:
- No theme wiring — `theme="light"` stays hardcoded
- `viewBackgroundColor: '#ffffff'` stays hardcoded
- Toolbar gets `dark:` variants but the canvas itself is unaffected

---

## Color Palette

All dark tokens use Tailwind's `neutral` scale (pure gray, zero color cast).

| Token | Light | Dark (Tailwind class) | Hex |
|---|---|---|---|
| Page background | `bg-white` / `bg-canvas` | `dark:bg-neutral-950` | `#0a0a0a` |
| Surface / cards | `bg-gray-50` / `bg-white` | `dark:bg-neutral-900` | `#171717` |
| Borders | `border-gray-200` | `dark:border-neutral-800` | `#262626` |
| Text primary | `text-gray-900` | `dark:text-neutral-100` | `#f5f5f5` |
| Text muted | `text-muted` (`#6b7280`) | `dark:text-neutral-500` | `#737373` |
| Navbar bg | `bg-white/90` | `dark:bg-neutral-950/90` | `#0a0a0a` + blur |
| Excalidraw viewer bg | `#f8fafc` | `#111111` (custom CSS) | — |
| Brand accent | `brand-500` (`#6366f1`) | unchanged | — |

---

## Files Changed

### New files

- `src/components/ui/ThemeProvider.tsx`
- `src/components/ui/ThemeToggle.tsx`

### Modified files

| File | Changes |
|---|---|
| `package.json` | Add `next-themes` dependency |
| `src/app/layout.tsx` | Wrap in `ThemeProvider`, add `suppressHydrationWarning` to `<html>` |
| `src/app/globals.css` | Dark body bg, `.dark .excalidraw-viewer` CSS variable override |
| `src/components/layout/Navbar.tsx` | Add `ThemeToggle`, `dark:` variants on nav bg/border |
| `src/components/layout/Sidebar.tsx` | `dark:` variants on panel bg, border, progress bar, links |
| `src/components/layout/Footer.tsx` | `dark:` variants on bg, border, text |
| `src/app/HomeContent.tsx` | `dark:` variants on page bg, cards, hero text |
| `src/components/chapter/ChapterHeader.tsx` | `dark:` variants on text colors |
| `src/components/notes/NotesDrawer.tsx` | `dark:` variants on drawer bg/header — canvas area untouched |
| `src/components/notes/NotesCanvas.tsx` | `dark:` variants on toolbar only |
| `src/components/newsletter/SubscribeForm.tsx` | `dark:` variants on input bg/border/text |
| `src/components/chapter/ExcalidrawViewer.tsx` | Dynamic `theme` + `viewBackgroundColor` via `useTheme()` |

### Not changed

- All API routes
- Firebase / auth logic
- `NotesCanvas` Excalidraw instance (always light)
- Brand colors

---

## What Does NOT Change

- Notes canvas Excalidraw — always `theme="light"`, always white background
- Brand indigo — same in both modes, acts as sole accent
- All server-side code, API routes, Firebase, auth
