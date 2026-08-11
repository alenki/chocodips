import { useEffect, useState } from 'react';
import type { RouteId } from '../types';

export const routePath: Record<RouteId, string> = {
  home: '#/',
  menu: '#/menu',
  daily: '#/daily',
  careers: '#/careers',
  reviews: '#/reviews',
};

const lookup: Record<string, RouteId> = {
  '/': 'home',
  '/menu': 'menu',
  '/daily': 'daily',
  '/careers': 'careers',
  '/reviews': 'reviews',
};

/**
 * Returns the route for the current hash, or null when the hash is an in-page
 * anchor such as #main (skip link) or #top (back to top). Those must scroll
 * within the current page, not navigate away from it.
 */
function parse(): RouteId | null {
  if (typeof window === 'undefined') return 'home';
  const raw = window.location.hash.replace(/^#/, '').split('?')[0];
  if (raw && !raw.startsWith('/')) return null;
  const clean = raw.replace(/\/+$/, '') || '/';
  return lookup[clean] ?? 'home';
}

/** Minimal hash router — five pages, no dependency needed. */
export function useHashRoute(): RouteId {
  const [route, setRoute] = useState<RouteId>(() => parse() ?? 'home');

  useEffect(() => {
    const onChange = () => {
      const next = parse();
      if (next) setRoute(next);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

export function navigate(route: RouteId) {
  if (window.location.hash === routePath[route]) return;
  window.location.hash = routePath[route];
}
