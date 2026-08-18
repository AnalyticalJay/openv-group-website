import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const marqueeStyles = readFileSync(
  resolve(process.cwd(), "client/src/components/partner-marquee.css"),
  "utf8",
);
const marqueeComponent = readFileSync(
  resolve(process.cwd(), "client/src/components/PartnerMarquee.tsx"),
  "utf8",
);

describe("Technology Partners marquee presentation", () => {
  it("keeps partner logos in full colour and removes visual hover styling", () => {
    expect(marqueeStyles).toContain("filter: none;");
    expect(marqueeStyles).not.toContain(".partner-marquee__card:hover");
    expect(marqueeStyles).not.toContain("grayscale(100%)");
    expect(marqueeStyles).not.toContain("translateY(-12px)");
  });

  it("does not pause the marquee on mouse hover while preserving keyboard focus support", () => {
    expect(marqueeComponent).not.toContain("mouseenter");
    expect(marqueeComponent).not.toContain("mouseleave");
    expect(marqueeComponent).toContain("focusin");
    expect(marqueeComponent).toContain("focusout");
  });
});
