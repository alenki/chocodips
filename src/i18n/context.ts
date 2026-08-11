import { createContext, useContext } from 'react';
import type { Bilingual, Locale } from '../types';
import type { CopyKey } from './dict';

export interface LocaleApi {
  locale: Locale;
  setLocale: (next: Locale) => void;
  /** Look up a copy key in the active locale. */
  t: (key: CopyKey) => string;
  /** Resolve a bilingual data field (menu names, journal bodies). */
  pick: (value: Bilingual) => string;
}

export const LocaleContext = createContext<LocaleApi | null>(null);

export function useLocale(): LocaleApi {
  const api = useContext(LocaleContext);
  if (!api) throw new Error('useLocale must be used inside <LocaleProvider>');
  return api;
}
