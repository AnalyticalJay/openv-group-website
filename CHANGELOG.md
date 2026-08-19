# Changelog

This document records the material, user-facing homepage releases for the OpenV Group website. It is a curated product history; the complete commit-level record remains available through `git log`.

## Single-flow operating model — 2026-08-19

**Replaced** the two separate fragmented-versus-connected cards with one visual transformation flow. The revised model brings individual technology inputs through a visible convergence point into OpenV coordination, then finishes with the shared business outcomes. This creates a single cause-to-outcome narrative without expanding the section’s copy.

## Operating-model clarity refinement — 2026-08-19

**Clarified** the fragmented-versus-connected model comparison through compact Before/After ownership labels, a “handoffs create gaps” cue, a “one relationship” transition, and a minimal technology, operations, and growth coordination path. The visual keeps the approved model artwork and concise outcome cards while making the operating model easier to understand at a glance.

## Industry and trust hierarchy refinement — 2026-08-19

**Removed** numeric prefixes from the One Group trust metrics and the one-call, one-invoice, one-relationship outcomes. **Redesigned** the Built for the Real World panel as a sector-led experience with a clearer headline, connected-delivery statement, colour-coded sector signals, and responsive industry cards—preserving the existing industries, capability story, and motion language.

## Operating-layer hierarchy refinement — 2026-08-19

**Removed** the repeated Connect, Enable, Amplify summary from beneath the operating-layer header. **Refined** the three primary capability blocks as the single expression of those specialist themes, with a clearer introductory statement, stronger numbered markers, signature accent rules, increased card spacing, distinct “Explore” affordances, and preserved feature tags.

## Consolidated trust metrics — 2026-08-19

**Removed** the duplicate credibility metric row from the operating-layer section. **Refined** the One Group / Complete Technology Partner block into the homepage’s single primary trust presentation, with a Proven capability header, a restrained “Built for scale” indicator, numbered metric markers, accent dots, stronger values, and responsive hover treatment while preserving all established factual proof points.

## Operating-layer proof points — 2026-08-19

**Added** a compact three-metric proof-point row beneath the operating-layer capability summary. It surfaces established OpenV Group facts—20+ years in South Africa, 45 ICT specialists, and 8 corporate ICT partners—without interrupting the header-led hierarchy or the existing capability-lane flow.

## Operating-layer header redesign — 2026-08-19

**Removed** the duplicated dark operating-layer illustration from the OpenV Group / One Operating Layer section. **Changed** the section into a focused header-led composition with a concise connected-capability statement and a three-part Connect, Enable, Amplify summary, allowing the existing capability lanes to become the primary visual narrative.

## Responsive alignment refinement — 2026-08-19

**Changed** the homepage to use centered editorial alignment on mobile for headlines, supporting copy, CTAs, content cards, and footer information. **Changed** the OpenV Business, NextFour, and ShiftBridge hero brand cards so their uploaded logos, descriptions, tags, and directional links are centered across both mobile and desktop layouts. Desktop alignment remains unchanged outside the three hero brand cards.

## Current documentation release — 2026-08-18

**Added** a complete project README covering architecture, design system, development commands, production safeguards, accessibility, content governance, and publishing workflow. **Added** this changelog and a contribution guide for brand and content updates.

## Mobile hero optimisation — checkpoint `65b46cd2`

**Changed** the animated hero to use mobile-specific SVG stream geometry at 320px, 375px, and 430px. Orange, blue, and green technology streams now converge without crossing the headline or CTA region. Particle and node density is capped on smaller screens, the convergence point is repositioned, and reduced-motion behavior remains intact.

## Production runtime recovery — checkpoints `251a0608`, `28c7cd74`

**Fixed** a production-only white page caused by unsafe Vite manual chunk splitting. React-dependent packages now remain in Vite’s natural execution graph, while only self-contained motion and optional 3D packages are isolated. Both the custom domain and Manus domain were revalidated after publishing.

## Connected-technology hero — checkpoint `2dc63173`

**Added** a premium dark-navy hero background that represents OpenV Group’s three connected capability streams. The experience includes generated artwork, converging orange/blue/green paths, a convergence halo and orbit, particle flow, pulsing nodes, floating modules, parallax depth, and a protected text-safe area.

## PDF-informed homepage narrative — checkpoint `6e2fedf7`

**Added** the OpenV Group Advantage proof-point section, a fragmented-vendors-to-one-accountable-group visual, and an applied-AI rail. **Changed** hero, brand, operating-layer, partner, footer, and metadata copy to reflect the company document while keeping the landing page concise.

## Navigation, header, and interaction polish — checkpoints `e1c81a06`, `fb924484`, `ad858ea7`

**Changed** the header logo and consultation CTA to match the hero’s visual weight. **Added** desktop navigation underline motion, keyboard focus styling, reusable GSAP section reveals, scroll-linked depth, and touch-safe press interactions. Motion includes reduced-motion support and cleanup safeguards.

## Technology Partners evolution — checkpoints `07b2abf8`, `368ec7e4`

**Replaced** the original partner carousel with a continuous GSAP marquee featuring fading edges and an accessible expanded directory. **Changed** cards to larger full-colour logo surfaces and removed visual hover effects, while keeping the marquee continuous, responsive, and keyboard-safe.

## Brand-card evolution — checkpoints `3e31fbec` and related revisions

**Replaced** hero brand videos with static, lightweight brand cards that preserve direct links. **Added** uploaded OpenV, NextFour, and ShiftBridge logo assets. **Changed** feature assignment, removed redundant labels and metadata, and enlarged logo presentation for a cleaner hero composition.

## Foundation, conversion, and responsive releases — historical milestones

The earlier release line established the React/Vite application, responsive homepage structure, S3-backed assets, actual technology partner marks, GSAP/Lenis motion, contact-form validation, tRPC/database support, accessible navigation, mobile layout, and the initial visual design system. It also contains the historical splash-screen work, which was later removed from the live landing experience in favour of a direct homepage load.

| Area | Published outcome |
| --- | --- |
| Foundation | Migrated the project to the current React, Vite, Tailwind, Express, tRPC, and Drizzle architecture. |
| Responsive behavior | Established mobile, tablet, desktop, and ultra-wide layouts; later refined mobile header, hero, cards, and text scaling. |
| Conversion | Added the globally accessible Book a Consultation modal with validation, success states, and navigation integration. |
| Visual system | Standardised the navy canvas, orange/red editorial gradient, Manrope/Inter typography, shared buttons, card language, footer, and navigation. |
| Motion and performance | Added GSAP/Lenis, scroll progress, section reveal primitives, reduced-motion safeguards, Chromium QA, and production asset-graph regression coverage. |

## Release process

Every material release should update this document under a dated heading, identify the relevant checkpoint, and summarise user-visible changes, production fixes, or design decisions. Publish only after `pnpm test`, `pnpm build`, responsive preview checks, and any production-specific validation have passed.
