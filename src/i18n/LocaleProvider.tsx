import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Bilingual, Locale } from '../types';
import { dict } from './dict';
import type { CopyKey } from './dict';
import { LocaleContext } from './context';

const STORAGE_KEY = 'chocodips:locale';

function readInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'ru' || stored === 'en') return stored;
  } catch {
    /* storage blocked — fall through to language sniffing */
  }
  /* The cafe is Russian-speaking and so is its city — RU is the front door.
     Visitors switch to EN from the header, and the choice is remembered. */
  return 'ru';
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);

  const t = useCallback((key: CopyKey) => dict[locale][key], [locale]);
  const pick = useCallback((value: Bilingual) => value[locale], [locale]);

  const api = useMemo(() => ({ locale, setLocale, t, pick }), [locale, setLocale, t, pick]);

  return <LocaleContext.Provider value={api}>{children}</LocaleContext.Provider>;
}
