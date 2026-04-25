# Audit Plan: swiss-reactive-portfolio

## Scope
- **Project**: Svelte 5 reactive portfolio website
- **Design System**: Swiss International Typographic Style
- **Tech Stack**: SvelteKit 2, Svelte 5 (runes), TailwindCSS v4, Cloudflare adapter

## Claims to Verify
1. Svelte 5 runes usage ($state, $derived, $effect, $props) — no Svelte 4 legacy syntax
2. Swiss minimal design tokens — monochrome palette, grid-based layout, typography-first
3. 4-page navigation structure (index, archive, projects, colabo) with sub-nav
4. Reactive section tracking via IntersectionObserver pattern
5. Expandable content patterns (experience timeline, archive preview, projects preview)
6. CTA component on every page as last section

## Files Created
- `src/lib/styles/global.css` — Swiss design tokens (CSS custom properties)
- `src/lib/types/index.ts` — TypeScript interfaces
- `src/lib/data/content.ts` — Mock data (experiences, blog posts, projects, collaborations)
- `src/lib/components/Header.svelte` — Sticky nav with mobile hamburger
- `src/lib/components/Footer.svelte` — Footer with navigation + social links
- `src/lib/components/SectionNav.svelte` — Per-page sub-navigation
- `src/lib/components/Hero.svelte` — Hero section with large headline
- `src/lib/components/Profile.svelte` — Profile/bio section
- `src/lib/components/ExperienceTimeline.svelte` — Vertical timeline, expandable
- `src/lib/components/ArchivePreview.svelte` — 4-post grid preview
- `src/lib/components/ProjectsPreview.svelte` — 4-project grid preview
- `src/lib/components/CTA.svelte` — Call-to-action (every page)
- `src/routes/+layout.svelte` — Root layout with Header/Footer
- `src/routes/+page.svelte` — Index (6 sections)
- `src/routes/archive/+page.svelte` — Archive listing
- `src/routes/projects/+page.svelte` — Projects listing
- `src/routes/colabo/+page.svelte` — Collaborations + contact

## Verification Method
- Build with `vite build` — verify zero errors
- Svelte 5 syntax audit — all components use `$props()`, `$state`, `$derived`
- No Svelte 4 remnants — no `export let`, no `on:click`, no `$bindable()` outside `$props()`
