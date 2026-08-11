import { cafe } from '../data/cafe';

export interface Composed {
  text: string;
  href: string;
}

/**
 * There is no server behind this site, so forms are honest about what they do:
 * they assemble the message and hand it to WhatsApp, prefilled.
 */
export function compose(intro: string, rows: [string, string][]): Composed {
  const body = rows
    .filter(([, value]) => value.trim().length > 0)
    .map(([key, value]) => `${key}: ${value.trim()}`);

  const text = [intro, '—', ...body].join('\n');
  return { text, href: `${cafe.whatsapp}?text=${encodeURIComponent(text)}` };
}
