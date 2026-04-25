# Audit: Swiss-Inspired Reactive Portfolio (Svelte 5)

**Slug**: `swiss-reactive-portfolio`
**Date**: 2026-04-23

## Overview

A complete Swiss International Typographic Style portfolio built with Svelte 5 runes, SvelteKit 2, and TailwindCSS v4. The design is monochrome, grid-based, and typography-first — avoiding gradients, blobs, glassmorphism, and decorative effects.

---

## Architecture

### File Structure
```
src/
├── lib/
│   ├── styles/
│   │   └── global.css           # Swiss design tokens (CSS custom properties)
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── data/
│   │   └── content.ts           # Mock content (experiences, posts, projects, colabs)
│   └── components/
│       ├── Header.svelte        # Sticky header + mobile hamburger nav
│       ├── Footer.svelte        # Footer with nav + social links
│       ├── SectionNav.svelte    # Per-page sub-navigation (6 items per page)
│       ├── Hero.svelte          # Large headline hero section
│       ├── Profile.svelte       # Bio/profile with optional avatar
│       ├── ExperienceTimeline.svelte  # Vertical timeline, shows 3 → expand
│       ├── ArchivePreview.svelte      # 4-post grid with "view all" link
│       ├── ProjectsPreview.svelte     # 4-project grid with "view all" link
│       └── CTA.svelte           # Call-to-action (appears on every page)
└── routes/
    ├── +layout.svelte           # Root layout (Header → children → Footer)
    ├── +page.svelte             # Index: hero → profile → experience → archive → projects → CTA
    ├── archive/+page.svelte     # Full blog listing + CTA
    ├── projects/+page.svelte    # Full project listing + CTA
    └── colabo/+page.svelte      # Collaborations + contact grid + CTA
```

### Navigation Structure
- **4 main nav routes**: `/`, `/archive`, `/projects`, `/colabo`
- **Per-page sub-nav**: `SectionNav` component with smooth scroll to sections
- **Sticky header**: persists across all pages with active route highlighting

### Svelte 5 Reactivity Patterns
| Pattern | Usage |
|---------|-------|
| `$props()` | All component props with destructuring + defaults |
| `$state()` | `visibleCount` (timeline), `activeId` (section nav), `mobileOpen` (header) |
| `$derived()` | `visible`, `hasMore`, `displayPosts`, `displayProjects` slices |
| `$effect()` | Validation sync (visibleCount ≤ total, activeId ∈ valid sections) |
| `class:active` | Conditional CSS classes for nav and section links |

---

## Design System Verification

### Swiss International Typographic Style
| Trait | Implementation | Status |
|-------|---------------|--------|
| Strict grid layout | `max-width: 1200px`, CSS Grid for cards/contacts | ✅ |
| Monochrome palette | `--color-bg: #FAFAFA`, `--color-text: #0A0A0A`, `--color-border: #E5E5E5` | ✅ |
| Typography-first | `text-5xl` headlines, uppercase `label` class with `letter-spacing: 0.1em` | ✅ |
| Thin dividers | `1px solid var(--color-border)` between all sections/cards | ✅ |
| Minimal rounded corners | `--radius-sm: 2px`, `--radius-md: 4px` only on tags | ✅ |
| No gradients/blobs/3D | Zero `background-image`, `box-shadow`, or `transform: scale` | ✅ |
| Restrained spacing | `--space-section: 6rem`, `--space-block: 3rem`, `--space-element: 1.5rem` | ✅ |
| Subtle hover states | `border-color` transitions, inverted button hover | ✅ |

### CSS Design Tokens
- **Colors**: 6 tokens (bg, surface, text, text-muted, border, border-hover)
- **Typography**: 9 sizes (xs through 5xl), single weight scale (500-700)
- **Spacing**: 3 section-level variables + standard Tailwind utilities
- **Transitions**: 2 durations (150ms fast, 250ms normal), single easing curve

---

## Issues Found

### 1. Svelte 4 → Svelte 5 Syntax Migration (Fixed)
- **Issue**: Initial components used `export let`, `on:click`, `$bindable()`, `$byDefault()`
- **Fix**: Converted all to `$props()` with destructuring, `onclick`, standard defaults
- **Risk**: If user adds new components, must use Svelte 5 syntax

### 2. `@last` Special Variable Parse Error (Fixed)
- **Issue**: `{#if !hasMore \|\| @last}` caused rolldown parser error
- **Fix**: Used indexed each block `{#each visible as exp, i}` with `i < visible.length - 1`
- **Risk**: Low — pattern is now stable

### 3. Pre-existing Project Issues (Not Fixed — Out of Scope)
- **`$lib/paraglide/runtime`** — Paraglide i18n types not generated (run `bun run prepare`)
- **`D1Database`** — Cloudflare D1 types not generated (run `bun run gen`)
- These are configuration-level issues from the base project, not from this build

### 4. Content Data Is Hardcoded (By Design)
- `content.ts` contains mock data as placeholders
- **Recommendation**: Replace with MDX/blog posts, CMS API, or Drizzle database queries
- **Risk**: Medium — needs integration before production

### 5. No Blog Post Detail Pages
- `/archive` lists posts but clicking "Read more" navigates to `/blog/[slug]` which doesn't exist
- **Recommendation**: Add `src/routes/blog/[slug]/+page.svelte` with MDX or content loading
- **Risk**: Medium — broken links on archive page

### 6. Contact Section Has No Form
- `/colabo` contact section lists email/social links but no form
- **Recommendation**: Add a simple form with Cloudflare Workers handler or use Formspree
- **Risk**: Low — links work, but no inline contact option

---

## Section Coverage Matrix

| Page | Hero | Profile | Experience | Archive | Projects | Colabo | CTA |
|------|------|---------|------------|---------|----------|--------|-----|
| Index `/` | ✅ | ✅ | ✅ (3+expand) | ✅ (4 preview) | ✅ (4 preview) | — | ✅ |
| Archive `/archive` | — | — | — | ✅ (full list) | — | — | ✅ |
| Projects `/projects` | — | — | — | — | ✅ (full list) | — | ✅ |
| Colabo `/colabo` | — | — | — | — | — | ✅ (full list) | ✅ |

---

## Build Verification

```
✓ 176 modules transformed
✓ built in 2.09s
✔ Using @sveltejs/adapter-cloudflare
```

Zero build errors. All Svelte 5 runes compile correctly.

---

## Sources

- **Project Repository**: `/Users/yu/Spaces/p/sv_project` (local)
- **Svelte 5 Documentation**: https://svelte.dev/docs/svelte/runes
- **SvelteKit Documentation**: https://svelte.dev/docs/kit
- **TailwindCSS v4**: https://tailwindcss.com/docs
- **Design Reference**: International Typographic Style (Swiss Style)
