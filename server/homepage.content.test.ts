import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const homepageSource = readFileSync(
  resolve(process.cwd(), "client/src/pages/Home.tsx"),
  "utf8",
);
const homepageDocument = readFileSync(
  resolve(process.cwd(), "client/index.html"),
  "utf8",
);
const heroVisualSource = readFileSync(
  resolve(process.cwd(), "client/src/components/HeroTechnologyBackground.tsx"),
  "utf8",
);
const heroVisualStyles = readFileSync(
  resolve(process.cwd(), "client/src/components/hero-technology-background.css"),
  "utf8",
);

describe("PDF-informed homepage content", () => {
  it("includes the consolidated group narrative and four proof points", () => {
    expect(homepageSource).toContain("THE OPENV GROUP ADVANTAGE");
    expect(homepageSource).toContain("One call.<br />One invoice.");
    expect(homepageSource).toContain("Years in South Africa");
    expect(homepageSource).toContain("ICT specialists");
    expect(homepageSource).toContain("Corporate ICT partners");
    expect(homepageSource).toContain("Integrated brands");
  });

  it("keeps the brand and operating-layer messages concise", () => {
    expect(homepageSource).toContain("Managed IT, cybersecurity, cloud and connectivity");
    expect(homepageSource).toContain("CRM, quoting, jobs, invoicing and automation");
    expect(homepageSource).toContain("Active partner relationships that unlock specialist support");
    expect(homepageSource).not.toContain("Think about how many technology vendors your business currently deals with");
  });

  it("uses the complete technology partner positioning in SEO metadata", () => {
    expect(homepageDocument).toContain("OpenV Group | Your Complete Technology Partner");
    expect(homepageDocument).toContain("managed IT, cybersecurity, cloud, digital growth and business software");
  });

  it("adds the vendor-consolidation and applied-AI visual narratives", () => {
    expect(homepageSource).toContain("WHY THE GROUP EXISTS");
    expect(homepageSource).toContain("Technology breaks<br />");
    expect(homepageSource).toContain("One accountable<br />technology partner.");
    expect(homepageSource).toContain("PRACTICAL AI / ALREADY AT WORK");
    expect(homepageSource).toContain("Microsoft 365 Copilot");
    expect(homepageSource).toContain("ShiftBridge workflows");
    expect(homepageSource).toContain("NextFour marketing");
  });

  it("defines the connected hero visual, animated particles, and reduced-motion fallback", () => {
    expect(heroVisualSource).toContain("openv-connected-technology-hero_29faa8b3.jpg");
    expect(heroVisualSource).toContain("data-hero-particles");
    expect(heroVisualSource).toContain("data-hero-nodes");
    expect(heroVisualSource).toContain("hero-tech-stream--secondary");
    expect(heroVisualSource).toContain("hero-tech-streams__mobile");
    expect(heroVisualSource).toContain("--particle-mobile-x");
    expect(heroVisualSource).toContain("hero-tech-convergence");
    expect(heroVisualStyles).toContain("@keyframes hero-data-particle");
    expect(heroVisualStyles).toContain("@keyframes hero-data-particle-mobile");
    expect(heroVisualStyles).toContain("@keyframes hero-convergence-pulse");
    expect(heroVisualStyles).toContain("@media (max-width: 480px)");
    expect(heroVisualStyles).toContain("@media (max-width: 360px)");
    expect(heroVisualStyles).toContain("@media (prefers-reduced-motion: reduce)");
    expect(homepageDocument).toContain('rel="preload" as="image"');
  });
});
