export type Locale = 'ru' | 'en';

export interface Bilingual {
  ru: string;
  en: string;
}

export type CategoryId = 'signature' | 'crepes' | 'warm' | 'pancakes' | 'sharing';

export interface MenuCategory {
  id: CategoryId;
  /** Roman numeral used as the section register mark. */
  index: string;
  title: Bilingual;
  note: Bilingual;
}

export interface MenuItem {
  id: string;
  /** Two-digit register number, printed beside the name. */
  index: string;
  category: CategoryId;
  price: number;
  name: Bilingual;
  desc: Bilingual;
  /** Percent-encoded paths under /public. Empty when the dish has no shoot yet. */
  images: string[];
  tags?: Bilingual[];
  featured?: boolean;
}

export interface JournalEntry {
  id: string;
  /** Register number for the entry. */
  index: string;
  kicker: Bilingual;
  title: Bilingual;
  body: Bilingual[];
  image: string;
  /** Optional pull-quote lifted out of the entry. */
  pull?: Bilingual;
}

export type RouteId = 'home' | 'menu' | 'daily' | 'careers' | 'reviews';
