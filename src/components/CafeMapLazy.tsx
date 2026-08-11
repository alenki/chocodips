import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import './CafeMap.css';

const CafeMap = lazy(() =>
  import('./CafeMap').then((module) => ({ default: module.CafeMap })),
);

/**
 * Leaflet is ~150 kB and lives on one section of one page, so it is only
 * fetched once the map is about to enter the viewport.
 */
export function CafeMapLazy() {
  const ref = useRef<HTMLDivElement>(null);
  /* Browsers without IntersectionObserver simply load it straight away. */
  const [near, setNear] = useState(
    () => typeof window !== 'undefined' && !('IntersectionObserver' in window),
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || near) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [near]);

  return (
    <div ref={ref}>
      {near ? (
        <Suspense fallback={<div className="cmap cmap--pending" />}>
          <CafeMap />
        </Suspense>
      ) : (
        <div className="cmap cmap--pending" />
      )}
    </div>
  );
}
