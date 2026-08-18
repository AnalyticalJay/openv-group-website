import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const viteConfig = readFileSync(resolve(process.cwd(), "vite.config.ts"), "utf8");

describe("production Vite chunking", () => {
  it("isolates only standalone motion and 3D vendors from the React dependency graph", () => {
    expect(viteConfig).toContain('return "vendor-motion";');
    expect(viteConfig).toContain('return "vendor-3d";');
    expect(viteConfig).not.toContain('return "vendor-react";');
    expect(viteConfig).not.toContain('return "vendor-ui";');
    expect(viteConfig).not.toContain('return "vendor-data";');
    expect(viteConfig).not.toContain('return "vendor-misc";');
  });
});
