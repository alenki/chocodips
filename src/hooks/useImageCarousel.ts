import { useState, useCallback, useRef } from 'react';

export function useImageCarousel(images: string[]) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef(0);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goTo = useCallback((i: number) => setIndex(i), []);

  const reset = useCallback(() => setIndex(0), []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  }, [next, prev]);

  return { index, next, prev, goTo, reset, onTouchStart, onTouchEnd };
}
