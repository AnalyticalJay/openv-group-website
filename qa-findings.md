# QA Findings

The mobile preview at 375×812 loads the homepage directly without the splash screen. The enlarged OpenV Group logo remains aligned left while the hamburger control stays aligned right. The hero displays the requested specialist-brand headline and supporting copy without overflow, and the ecosystem strip remains readable below it.

The desktop preview at 1280×720 loads the homepage directly. The header logo is visibly larger, the hero headline and gradient treatment render correctly, and the CTA row remains aligned within the hero layout. The build and existing Vitest suite both completed successfully.

## Revised Hero and Section Order

The mobile preview shows the globe has been replaced by a dark abstract technology background with a clear text-safe area behind the hero copy. The desktop full-page preview confirms the three brand video blocks now sit immediately beneath the hero on the same dark navy visual field, followed by the white “One Ecosystem. Endless Possibilities.” strip. The brand block layout remains three columns on desktop and is set to stack responsively on mobile.
