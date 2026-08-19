import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const contactFormModalSource = readFileSync(
  resolve(process.cwd(), 'client/src/components/ContactFormModal.tsx'),
  'utf8',
);

describe('consultation form modal', () => {
  it('uses the fixed premium dark enterprise layout while preserving conversion and form behavior', () => {
    expect(contactFormModalSource).toContain('max-w-5xl');
    expect(contactFormModalSource).toContain('lg:grid-cols-[0.84fr_1.16fr]');
    expect(contactFormModalSource).toContain('Let’s map the');
    expect(contactFormModalSource).toContain('Within one business day');
    expect(contactFormModalSource).toContain('validateForm');
    expect(contactFormModalSource).toContain('sanitizeInput');
    expect(contactFormModalSource).toContain('Send consultation request');
    expect(contactFormModalSource).toContain("prefersReducedMotion()");
    expect(contactFormModalSource).toContain('aria-modal="true"');
  });
});
