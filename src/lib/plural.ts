import type { Locale } from '../types';

/** Russian needs three forms: 1 позиция · 4 позиции · 19 позиций. */
function ruForm(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}

export function positions(n: number, locale: Locale): string {
  if (locale === 'en') return n === 1 ? 'dish' : 'dishes';
  return ruForm(n, ['позиция', 'позиции', 'позиций']);
}

/** "19 позиций" / "19 dishes" */
export function countPositions(n: number, locale: Locale): string {
  return `${n} ${positions(n, locale)}`;
}

/** "3 фото" / "3 photos" — «фото» is indeclinable in Russian. */
export function countPhotos(n: number, locale: Locale): string {
  return locale === 'en' ? `${n} ${n === 1 ? 'photo' : 'photos'}` : `${n} фото`;
}
