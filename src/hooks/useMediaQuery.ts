import { useCallback, useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );

  const read = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, read, () => false);
}

/** True on devices with a real pointer — gates the custom cursor and hover previews. */
export function useFinePointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}
