# QA Findings

The mobile preview at 375×812 loads the homepage directly without the splash screen. The enlarged OpenV Group logo remains aligned left while the hamburger control stays aligned right. The hero displays the requested specialist-brand headline and supporting copy without overflow, and the ecosystem strip remains readable below it.

The desktop preview at 1280×720 loads the homepage directly. The header logo is visibly larger, the hero headline and gradient treatment render correctly, and the CTA row remains aligned within the hero layout. The build and existing Vitest suite both completed successfully.

## Revised Hero and Section Order

The mobile preview shows the globe has been replaced by a dark abstract technology background with a clear text-safe area behind the hero copy. The desktop full-page preview confirms the three brand video blocks now sit immediately beneath the hero on the same dark navy visual field, followed by the white “One Ecosystem. Endless Possibilities.” strip. The brand block layout remains three columns on desktop and is set to stack responsively on mobile.

## Unified Hero and Brand Canvas

The desktop full-page preview shows the hero artwork continuing behind the three brand cards with no visible color break or border seam. The cards sit within the same dark navy technology field, and the white ecosystem strip begins cleanly afterward. The mobile preview shows the hero content followed by stacked brand cards on the same background without overflow or horizontal scrolling.

## Reference Comparison Notes

The supplied reference shows a dark technology canvas continuing behind the brand cards, with the cards centered in one row and the white ecosystem/stats area beginning only after the dark composition ends. The implementation now matches those defining traits by nesting the companies section inside the hero, removing its border and navy section fill, using a transparent background, keeping the same centered three-column grid and responsive mobile stack, and allowing the hero artwork to cover the combined hero-plus-brands canvas. The result was checked in the desktop full-page screenshot and the mobile viewport screenshot.

## Final Continuous-Canvas Verification

A second desktop full-page capture confirms the hero artwork runs continuously behind the brand cards; there is no visible border, background-color change, or spacing seam before the ecosystem section. A second 375×812 mobile capture confirms the same background treatment remains intact while the cards stack vertically within the hero composition. This directly matches the supplied reference direction of one continuous dark technology section.

## Brand Card Spacing and Enhancement QA

The desktop full-page preview confirms the dark gap below the brand cards is materially reduced before the white ecosystem strip begins. The mobile preview confirms the cards remain stacked and touch-friendly. Each card now uses a reusable component with improved hover lift, zoomed media treatment, gradient readability overlay, inset highlight ring, animated accent line, accessible focus ring, descriptive aria label, and metadata preload for video media.

## Hero and Brand Spacing Refinement QA

The desktop preview confirms the brand cards now sit closer to the hero CTA row, while the dark padding beneath the cards is reduced before the ecosystem section begins. The mobile preview confirms the CTA-to-card transition is tighter without crowding the hero copy, and the stacked brand cards remain readable and within the continuous background.

## Header-to-Hero Spacing QA

The desktop preview shows a clear, more comfortable breathing space between the header and the main hero headline without changing the headline scale or hierarchy. The mobile preview retains the same readable top separation while keeping the headline, CTA row, and continuous brand cards within the viewport flow.

## Unified Capability Map QA

The desktop full-page preview confirms the duplicate “ALL THE SOLUTIONS. WORKING TOGETHER.” and “Solutions For Every Industry” icon-grid sections have been replaced by one editorial capability map directly below the ecosystem strip. It uses a large technology-to-momentum visual, three connected capability lanes, and compact industry labels. The mobile preview confirms the hero, brand cards, and new section remain responsive without horizontal overflow.

## Final Capability Map QA

The final desktop capture shows the consolidated section directly beneath the ecosystem strip with the headline, dark operating-layer visual, three connected capability lanes, compact original solution-theme labels, and industry chips. The duplicate icon grids and repeated section messaging are gone. The final mobile capture confirms the existing hero flow remains stable and the new section is responsive; the capability lanes collapse naturally without horizontal overflow.

## Operating-Layer Flow QA

The desktop full-page preview confirms the ecosystem strip is absent: the hero and continuous brand-card composition transitions directly into the “OPENV GROUP / ONE OPERATING LAYER” section. The operating-layer visual is larger and more prominent, with expanded orbit geometry, connection line, node labels, and depth. The “BUILT FOR THE REAL WORLD” area is now a dark visual band with a large 08 sector count and structured sector map. The mobile preview confirms the hero remains stable and responsive.

## Capability Block Enhancement QA

The desktop preview confirms the three capability blocks now read as distinct premium cards with stronger depth, white surface contrast, colored left rails, larger numbered markers, clearer hierarchy, compact theme pills, and directional arrow treatments. The mobile preview confirms the existing hero remains stable and the responsive stacking behavior is preserved. The capability-card treatments remain consistent with the existing OpenV palette and motion language.

## Final Capability Block QA

The final desktop capture confirms the three capability blocks use the enhanced card treatment: separated surfaces, subtle depth, accent rails, numbered markers, theme pills, and directional arrows. The final mobile capture confirms the surrounding homepage flow remains stable and the card layout remains responsive. Each block now also has semantic group labeling, keyboard focusability, and visible focus-ring styling in addition to the hover treatment.

## Partner Asset Check

The direct Vodacom asset resolves successfully and renders as a visible 1920×1920 WebP logo image with a light background. The marquee now includes eager loading for primary logos plus an accessible wordmark fallback, so partner cards remain informative during asset loading or in the event of an image failure.

## Live DOM Marquee Check

The live browser page contains the Technology Partners section and the partner names VODACOM, CITRIX, and MICROSOFT, confirming the duplicated marquee content is rendered in the DOM. The direct asset check also confirms the source files resolve successfully. Further visual review is being used to tune the card presentation and loading fallback.

## Focused Browser QA

The live browser confirms the revised operating-layer section is rendered and the page scroll remains stable. The browser could not advance further with the second scroll because the current viewport was retained by the preview layer; full-page captures remain the primary marquee verification source.

## Live Marquee Visual QA

Focused browser inspection confirms the Technology Partners marquee renders visible grayscale partner logos inside the white cards, with the Citrix, Microsoft, Cisco, Fortinet, and Dell marks readable in the live viewport. The dark isometric partner background remains intact, the fading edge treatment is visible at both sides, and the View All Partners CTA remains positioned below the track.

## Final Marquee QA

Desktop live-browser inspection confirms the infinite marquee shows visible grayscale partner logos in white cards over the dark isometric partner background, with faded edges at the track boundaries and the View All Partners CTA intact. The mobile full-page capture confirms the marquee collapses cleanly to the narrow viewport, keeps partner labels readable, and preserves the existing page flow without horizontal overflow.

## Partner Section Refinement QA

The desktop preview confirms the Technology Partners section is materially shorter, the partner cards are larger, and the View All Partners CTA remains within the section. The footer now follows directly after the partner section with no standalone “Ready to transform your business?” CTA block. The mobile preview confirms the enlarged cards remain readable and the direct partner-to-footer flow does not introduce horizontal overflow.

## Final Partner Size QA

Desktop and mobile verification confirm the partner cards are larger at each breakpoint, the marquee remains within the dark Technology Partners section, the View All Partners CTA stays visible, and the footer follows immediately after the section. Mobile cards stack and crop cleanly without horizontal overflow.

## Partners Headline QA

Desktop verification confirms the Technology Partners heading now follows the operating-layer editorial system with a small uppercase eyebrow, large Manrope headline, and orange-to-red gradient emphasis on “Partners.” Mobile verification confirms the two-line headline remains legible, centered, and proportionate above the marquee without disturbing the shortened section flow.

## Partners CTA Verification

Desktop and mobile captures confirm the approved gradient headline remains responsive and centered above the marquee. The View All Partners control is now a functional accessible toggle with expanded-state semantics and a partner-name list, while the existing partner card loop and direct footer flow remain intact.

## Semantic Directory QA

The final desktop and mobile captures confirm the Technology Partners headline, marquee, View All Partners control, and footer flow remain visually consistent after the semantic `ul`/`li` directory conversion. The expanded directory is implemented as an accessible list controlled by `aria-expanded` and `aria-controls`, and the mobile layout remains readable without horizontal overflow.

## Explicit Partner Directory Interaction QA

A headless Chromium check exercised the View All Partners control at both 1280×720 desktop and 375×812 mobile viewports. In both cases the initial state reported `aria-expanded=false`; clicking changed it to `true`, revealed the semantic partner directory with eight list items, and the second click returned it to `false`. Both viewports reported no document horizontal overflow.

## Homepage Motion QA

Desktop and mobile captures confirm the homepage keeps the approved visual hierarchy after the motion pass: hero and brand composition remain stable, capability lanes retain their editorial card treatment, the operating-layer visual remains legible, the partner marquee remains visible, and the direct footer transition stays intact. The new motion system is scoped to section wrappers and child elements, while PartnerMarquee retains its own marquee lifecycle.

## Homepage Motion Interaction QA

Chromium QA at 1280×720 and 375×812 confirmed all motion sections remain fully visible under `prefers-reduced-motion: reduce`, with section opacities at 1 and no horizontal overflow. Pointer-based interaction checks on the capability lane produced measurable transform changes on press and returned toward the resting state after release at both breakpoints. The new press helper is scoped to hero CTAs, brand cards, capability lanes, and the View All Partners toggle and is removed during page cleanup.

## Homepage Interaction QA

A real Chromium interaction pass confirmed that the hero CTA, OpenV brand card, capability lane, and View All Partners control all change state on desktop hover. The capability lane also responds to pointer press and releases cleanly on mobile-sized viewport input. All interaction checks passed without horizontal overflow.

## Comprehensive Homepage Interaction QA

The full Chromium interaction matrix passed. Desktop hover state changes were confirmed for both hero CTA buttons, the OpenV brand card, a capability lane, and the View All Partners toggle. Mobile pointer press and release changes were confirmed for both hero CTA buttons, the OpenV brand card, a capability lane, and the View All Partners toggle.

## Static Hero Brand Cards QA

The three hero brand blocks now render without video elements and use lightweight static surfaces with branded monograms, editorial labels, concise capability descriptions, metadata tags, accent rails, subtle orbital graphics, click-through links, hover lift/glow, and keyboard focus treatment. Desktop and mobile screenshots confirm the cards blend with the continuous hero canvas, remain readable, and stack without horizontal overflow.

## Corrected Brand Card Content QA

Desktop and mobile previews confirm that CONNECT, ENABLE, and AMPLIFY no longer appear in the three hero brand cards. Each card now displays a lightweight inline logo treatment: OpenV, NEXT4, and SHIFTBRIDGE. NextFour now carries the Web, Marketing, and Digital Growth feature set, while ShiftBridge carries Software, Automation, and AI. Cards remain linked, responsive, and free of video backgrounds.

## Uploaded Brand Logos QA

The uploaded OpenV Business, NextFour, and ShiftBridge logo assets are now used directly inside the hero brand cards through persistent web storage URLs. The inline text logo treatments are removed. Desktop and mobile previews confirm all three uploaded marks load, preserve their aspect ratios, remain contained within the cards, and sit alongside the corrected feature assignments and existing interaction states.

## Logo-Only Brand Card QA

The company-name headings beneath the uploaded OpenV, NextFour, and ShiftBridge logos have been removed. Desktop and mobile screenshots confirm a cleaner logo-led hierarchy, preserved descriptions and feature tags, intact card links and interactions, and no layout overflow.

## Enlarged Logo Card QA

The adjacent card metadata labels have been removed and the uploaded logos now occupy a full-width responsive header zone. Desktop and mobile screenshots confirm that OpenV Business, NextFour, and ShiftBridge marks are substantially larger, preserve their aspect ratios, and remain balanced with the descriptions, feature tags, card links, and existing motion states.

## Navigation Underline QA

Chromium verification at 1280×720 confirmed a non-active navigation link expands its gradient underline to computed scale `1` on hover. Keyboard navigation focused the expected “Our Companies” link and exposed the configured orange focus-ring color. The 375×812 mobile check confirmed the hamburger menu opens and remains visually unchanged by the desktop-only underline enhancement.

## PDF-Informed Homepage Content QA

The 1440×900 desktop and 375×812 mobile full-page captures confirm the PDF content has been integrated without turning the homepage into a long-form brochure. The hero, three brand cards, operating-layer section, Technology Partners section, and footer now use concise PDF-informed positioning. One new visually led “OpenV Group Advantage” section communicates the consolidation promise through one headline, four proof metrics, and three accountability outcomes. Both viewports retain the approved visual system, GSAP section motion, readable hierarchy, and no horizontal overflow. The expanded Vitest suite verifies the core narrative, metrics, concise-copy constraint, title, and meta description.

## Expanded PDF Content QA

The desktop and mobile full-page captures confirm the additional PDF stories remain visual rather than text-heavy. “Technology breaks in the gaps” compares five separate supplier categories with one accountable OpenV Group relationship, while “AI inside the business. Not beside it.” presents four practical applications in one unified rail. Both sections inherit the approved gradient typography, navy and light section rhythm, GSAP section reveal hooks, compact responsive hierarchy, semantic lists, and no horizontal overflow. The expanded Vitest suite verifies both narratives and the named AI applications.

## Connected-Technology Hero QA

The 1440×900 and 375×812 hero captures confirm the new artwork keeps the left headline and CTAs readable while three orange, blue, and green technology streams converge on the right. Chromium verified the generated background URL, 12 moving GPU-transformed data particles, six pulsing nodes, visible headline text, and no horizontal overflow at either breakpoint. With `prefers-reduced-motion: reduce`, particle and stream animations resolve to `none`, particles are hidden, headline content remains visible, and overflow remains false. Six Vitest checks and the production build pass.

## Intensified Hero Technology QA

The refined desktop hero now exposes three primary and three secondary animated streams, a larger convergence halo and rotating orbit, 20 moving particles, nine pulsing nodes, and five floating technology modules. Mobile intentionally caps the visible density to 10 particles, five nodes, and one module while retaining all three stream families and the convergence point. Chromium confirmed particle movement, visible headline content, and no horizontal overflow at both breakpoints. Reduced-motion mode disables particle, stream, orbit, and convergence animations while retaining the static visual narrative.

## Full-Colour Technology Partners QA

Chromium confirmed that partner logo images render with `filter: none` on both desktop and mobile. Hovering a continuously moving desktop card leaves its transform, border, and shadow unchanged while the marquee track continues to move. The marquee retains its fading-edge presentation, responsive card sizing, accessible focus state, and no horizontal overflow at both breakpoints. Eight Vitest checks and the production build pass.

## Production Blank-Page Diagnosis and Local Fix Validation

Both published domains returned HTTP 200 but rendered an empty `#root` with `Cannot read properties of undefined (reading 'createContext')` in the production browser. All production assets loaded successfully, isolating the failure to the previous broad Vite manual-chunk graph that separated mutually dependent React, UI, and data modules. The chunk strategy now isolates only self-contained GSAP/Lenis and optional 3D dependencies, leaving the React dependency graph in Vite's natural execution order. A locally built production server now renders two root children and 4,030 characters of page content with no page errors or request failures.

The first post-checkpoint domain revalidation still returned the prior deployed asset graph (`index-D6858Xnx.js` plus the old `vendor-react`, `vendor-ui`, `vendor-data`, and `vendor-misc` chunks) and the same `createContext` error. The checkpointed fix builds a new entry graph (`index-1LvrLjCu.js` plus only `vendor-motion`) and is ready to publish; the live domains must be republished from the latest checkpoint before they can serve the corrected production build.

After publishing checkpoint `251a0608`, both `https://www.openvgroup.com/` and `https://openvsite-fw27ucfq.manus.space/?code=9KT5LoMZizADZp9DnvGNh3` returned HTTP 200 with two populated root children and 4,030 characters of rendered page content. Both domains now serve the corrected entry graph (`index-CXhOKrPm.js` plus `vendor-motion`) with no page errors or asset request failures.
