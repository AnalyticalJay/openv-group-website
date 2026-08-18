# Contributing to the OpenV Group Website

This guide helps team members make safe, consistent updates to the OpenV Group website. The homepage is a premium enterprise experience with an approved visual language, so changes should improve clarity and quality without introducing unrelated patterns, generic templates, or duplicate content.

## Before You Change Anything

Read `README.md`, `CHANGELOG.md`, `todo.md`, and the relevant component before editing. Add a specific unchecked item to `todo.md` before implementation. Keep new work within the existing design system: Manrope headings, Inter body text, dark navy foundation, orange/red editorial gradient, large intentional spacing, and restrained motion.

## Brand Assets

Do not place large images, video, or logo files inside `client/src` or `client/public`. Store source assets in `/home/ubuntu/webdev-static-assets/`, upload them through the managed web-storage workflow, and use the returned `/manus-storage/...` URL in application code.

| Asset type | Required standard |
| --- | --- |
| Brand logos | Use approved source artwork, preserve aspect ratio, provide a descriptive `alt`, and test on the dark hero and light surfaces. |
| Hero artwork | Keep a calm left text-safe area and place visual density to the right of headline and CTAs. |
| Partner logos | Preserve full colour, avoid unapproved hover treatments, and retain the marquee’s accessible directory. |
| Video | Use only when it materially supports the story; prefer static optimized artwork in the hero and brand-card area. |

When replacing an asset, update the relevant component and verify that the old storage URL is no longer referenced. Do not generate substitute logos when approved artwork exists.

## Homepage Content

Homepage copy should lead with accountable outcomes, specialist capability, proof points, and practical technology value. Keep sections visually led and concise. Long product catalogues, detailed partner profiles, and extended service explanations belong on deeper pages rather than the landing page.

Use the following content rules:

1. Do not add fabricated reviews, ratings, testimonials, customer logos, or performance claims.
2. Do not repeat the same narrative in multiple sections; strengthen an existing section before adding a new one.
3. Preserve the established story: three specialist brands, one accountable group, connected operating layer, practical AI, trusted partners.
4. Update `server/homepage.content.test.ts` whenever a protected homepage narrative, proof point, or metadata claim changes.

## Design and Motion

Reuse existing shared components and classes. Do not redesign typography, colour palette, buttons, navigation, footer, or card language without an explicit design decision. Prefer opacity and transform for animation. Keep interactions short and interruptible, use focus-visible styles for keyboard users, and honour `prefers-reduced-motion` for all non-essential motion.

The connected technology hero has separate desktop and mobile geometry. Any hero update must preserve the text-safe area, all three stream families, mobile density caps, CTA readability, and no-overflow behavior at 320px, 375px, and 430px.

## Required Validation

Run the relevant quality gates before requesting review.

```bash
pnpm check
pnpm test
pnpm build
```

Also inspect desktop and mobile previews. For changes affecting the hero, marquee, navigation, or production configuration, run focused browser QA or reproduce the relevant interaction in Chromium. Check reduced-motion behavior where animation is involved.

## Publishing and Documentation

Mark completed tasks in `todo.md`, record material releases in `CHANGELOG.md`, and update `README.md` if the architecture, commands, assets, or deployment workflow changes. Create a checkpoint after validation. Publishing is performed from the project interface; after publishing production-sensitive changes, test both the custom domain and Manus domain.

## Pull Request Checklist

- [ ] The change follows the approved design system and avoids duplicated content.
- [ ] New or replaced assets use managed storage URLs, not local project paths.
- [ ] Copy is concise, accurate, and does not contain fabricated claims.
- [ ] Keyboard focus and reduced-motion behavior are considered.
- [ ] `pnpm check`, `pnpm test`, and `pnpm build` pass.
- [ ] Desktop and mobile behavior has been reviewed.
- [ ] `todo.md`, `CHANGELOG.md`, and `README.md` are updated when relevant.
