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
});
