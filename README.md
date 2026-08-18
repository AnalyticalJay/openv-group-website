# OpenV Group Website

**OpenV Group Website** is a premium enterprise technology homepage for a connected group of specialist brands. It presents managed IT, cybersecurity, cloud, digital growth, business software, automation, and applied AI as one accountable technology relationship rather than a collection of disconnected vendors.

The project is designed as a visual, performance-conscious marketing experience. Its homepage prioritises concise editorial messaging, premium motion, clear mobile behavior, and direct conversion paths without becoming text-heavy.

## Product Narrative

The homepage follows a deliberate business story. It begins with three specialist brands operating as one group, explains the operational cost of fragmented vendor relationships, shows how OpenV Group creates a single accountable operating layer, and then connects this foundation to practical AI, technology partners, and a consultation path.

| Homepage layer | Purpose | Primary implementation |
| --- | --- | --- |
| Hero and brand composition | Establishes the three-brand / one-group proposition through a connected-technology background and static brand cards. | `client/src/pages/Home.tsx`, `HeroTechnologyBackground.tsx` |
| Group Advantage | Communicates one call, one invoice, total accountability, and core proof points without a dense text block. | `client/src/pages/Home.tsx` |
| Vendor consolidation visual | Contrasts fragmented technology suppliers with a single accountable OpenV Group relationship. | `client/src/pages/Home.tsx` |
| Operating layer | Groups specialist capability lanes into infrastructure, business intelligence, and customer experience. | `client/src/pages/Home.tsx` |
| Applied AI rail | Shows AI in Microsoft Copilot, threat detection, ShiftBridge workflows, and NextFour marketing. | `client/src/pages/Home.tsx` |
| Technology Partners | Uses a full-colour, continuously scrolling partner marquee with accessible expanded directory. | `PartnerMarquee.tsx`, `partner-marquee.css` |

## Design System

The visual language uses an enterprise SaaS palette, Manrope for headings, Inter for supporting copy, generous spacing, strong editorial hierarchy, and restrained motion. The system is deliberately consistent across the homepage rather than treating each section as an unrelated campaign component.

| Token | Value | Use |
| --- | --- | --- |
| Dark navy | `#07111C` | Hero, technology canvas, dark content bands |
| Dark blue | `#0F1E33` | Supporting depth and layered surfaces |
| Primary green | `#13C46B` | Technology signal and selected system accents |
| Accent blue | `#1B8EFF` | Data, infrastructure, and network accents |
| Orange/red gradient | `#FF6B35` to `#FF1744` | Primary CTA and editorial emphasis |
| Light background | `#F8FAFC` | Light content surfaces |
| Body text | `#64748B` | Secondary copy |

## Technology Stack

The frontend uses **React 19**, **TypeScript**, **Vite 7**, and **Tailwind CSS 4**. The application server is built with **Express**, **tRPC**, **Drizzle ORM**, and a managed MySQL-compatible database. Homepage motion uses **GSAP** with ScrollTrigger alongside **Lenis** smoothing and carefully scoped CSS animation.

| Area | Key technologies |
| --- | --- |
| Client | React 19, TypeScript, Vite, Tailwind CSS 4, Wouter |
| Motion | GSAP, ScrollTrigger, Lenis, GPU-safe CSS transforms |
| Backend | Express 4, tRPC 11, Drizzle ORM, MySQL driver |
| Identity and storage | Manus OAuth and managed object storage |
| Validation and testing | Vitest, source-level regression tests, focused Chromium QA scripts during implementation |

## Project Structure

```text
client/
  src/
    components/              Reusable visual and interaction components
      HeroTechnologyBackground.tsx
      PartnerMarquee.tsx
      Navigation.tsx
      ContactFormModal.tsx
    contexts/                Contact, scroll, theme, and page-transition state
    lib/                     GSAP orchestration, form validation, and utilities
    pages/Home.tsx           Main public homepage composition
    index.css                Global theme and layout rules
  index.html                 Metadata and resource preloads

server/
  routers.ts                 tRPC routes
  db.ts                      Database helpers
  *.test.ts                  Vitest regression coverage

drizzle/
  schema.ts                  Database schema

vite.config.ts               Vite, safe production chunks, runtime configuration
```

## Key Visual Components

### Connected Technology Hero

`HeroTechnologyBackground.tsx` combines a generated premium technology artwork with SVG stream paths, data particles, pulsing nodes, floating modules, a convergence halo, and a text shield. The desktop and mobile experiences use separate stream geometries so the three orange, blue, and green technology families remain legible at every breakpoint.

The mobile configuration has been specifically checked at **320px**, **375px**, and **430px** widths. It caps visual density, preserves the CTA area, prevents horizontal overflow, and honors `prefers-reduced-motion` by disabling animated particle and stream motion.

### Technology Partners Marquee

`PartnerMarquee.tsx` renders an infinite GSAP logo track with duplicated content for a gap-free loop. Logos stay full colour at all times, the marquee retains soft CSS mask-image fade edges, and its accessible partner directory expands from the **View All Partners** control. The current presentation intentionally avoids visual hover effects on partner cards.

### Homepage Motion

Reusable GSAP helpers in `client/src/lib/animations.ts` handle section entrances, staggered child reveals, scroll-linked depth, and press feedback. Motion is scoped and cleaned up on unmount. The homepage uses transform and opacity-based animation rather than layout-triggering properties wherever possible.

## Getting Started

Use the project root as the working directory.

```bash
pnpm install
pnpm dev
```

The development command starts the Express/Vite development environment. Open the Manus preview URL surfaced by the workspace to view the site.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Starts the local development server with file watching. |
| `pnpm build` | Builds client assets and bundles the server entry for production. |
| `pnpm start` | Runs the bundled production server from `dist/index.js`. |
| `pnpm test` | Runs the Vitest regression suite. |
| `pnpm check` | Runs TypeScript without emitting files. |
| `pnpm format` | Applies Prettier formatting. |
| `pnpm db:push` | Generates and applies Drizzle migrations. |

## Production Build and Chunking

The Vite build uses conservative manual chunking. Only self-contained GSAP/Lenis motion code and optional Three.js code are isolated as vendor chunks. React, UI, data, and authentication dependencies remain in Vite’s natural dependency graph.

> This constraint is intentional. Broad vendor splitting can separate React-dependent packages into an invalid production execution order, causing a blank page before React mounts.

The Vitest suite includes a regression test that protects this chunking rule. When changing `vite.config.ts`, build and test the project locally before publishing.

## Assets and Media

Large visual assets are kept outside the repository in `/home/ubuntu/webdev-static-assets/` and uploaded through the managed web storage workflow. Application code references the resulting `/manus-storage/...` URL rather than local asset paths.

This keeps deployment builds lean and avoids embedding video or large binary files in the client source tree. The hero artwork and uploaded brand logos follow this pattern.

## Data, Authentication, and Secrets

The application includes managed OAuth, a server layer, and a database-ready Drizzle setup. Do not commit `.env` files or hard-code credentials. New environment values should be added through the project secret workflow so development and production remain aligned.

## Testing and Quality Gates

The regression suite currently covers authentication behavior, PDF-informed homepage narratives, partner marquee presentation, and safe Vite production chunking. The workflow for meaningful changes is:

1. Update or add the relevant Vitest coverage.
2. Run `pnpm test`.
3. Run `pnpm build`.
4. Verify the desktop and mobile preview.
5. For production-sensitive changes, validate the published domain in a browser after publishing.

The hero and marquee have additionally been checked with Chromium-based QA for motion, reduced-motion behavior, overflow protection, and interaction behavior.

## Accessibility and Responsive Behavior

The website uses semantic regions, accessible labels, visible keyboard focus treatments, responsive layout breakpoints, and motion fallbacks. The navigation, partner directory, contact flow, marquee, and hero all retain keyboard or touch-safe behavior. Non-essential animation is disabled for users who request reduced motion.

## Publishing Workflow

Create a checkpoint after a validated change. To move a checkpoint to the live domains, use the **Publish** control in the project interface. After publishing production-sensitive changes, check both the custom domain and Manus domain to ensure the deployed asset graph and client runtime are current.

## Content Governance

The homepage content is informed by the OpenV Group company document and is intentionally concise. It should continue to lead with business outcomes, accountability, specialist brand roles, and proof points. Detailed product catalogues, partner profiles, and long-form service descriptions belong on deeper brand, service, or partner pages rather than the homepage.

## Lighthouse CI and Performance Budgets

Lighthouse CI is recommended as a post-build quality gate for the published homepage. It should complement, rather than replace, the existing Vitest, production-build, browser QA, and live-domain checks. Lighthouse CI can collect multiple runs, apply assertions, and upload results from a CI workflow.[1]

Install the CLI as a development dependency when the team is ready to automate it:

```bash
pnpm add -D @lhci/cli
```

Create a `lighthouserc.cjs` file with a production-like server command appropriate to the CI runner. The example below uses the built server and three collection runs; adjust the start command and ready pattern if the CI environment supplies its own preview server.

```js
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: 'pnpm start',
      startServerReadyPattern: 'Server running',
      url: ['http://127.0.0.1:3000/'],
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
      },
    },
  },
};
```

| Budget | Target | Reason |
| --- | --- | --- |
| Performance score | At least 0.90 | Keeps the visual experience responsive on representative mobile hardware. |
| Accessibility score | At least 0.95 | Protects keyboard focus, semantics, contrast, and motion preferences. |
| LCP | 2.5 seconds or less | Aligns with the Core Web Vitals “good” threshold.[2] |
| CLS | 0.10 or less | Aligns with the Core Web Vitals “good” threshold.[2] |
| TBT | 300 ms or less | Flags main-thread regressions from animation, scripts, or vendor changes. |
| Initial JavaScript | 300 KiB gzip or less | Keeps the critical homepage script payload within the current safe bundle envelope. |
| Initial CSS | 35 KiB gzip or less | Protects first render and avoids utility/style growth. |

Run the proposed workflow with `pnpm exec lhci autorun` after `pnpm build`. Do not reintroduce broad Vite vendor splitting merely to satisfy a size warning: React-dependent packages must remain in a safe execution graph.

## References

[1] [Lighthouse CI documentation](https://github.com/GoogleChrome/lighthouse-ci)

[2] [Web Vitals: LCP and CLS thresholds](https://web.dev/articles/vitals)
