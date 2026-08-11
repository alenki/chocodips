import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Cursor } from './components/Cursor';
import { useHashRoute } from './hooks/useHashRoute';
import { useLocale } from './i18n/context';
import { Home } from './pages/Home';
import { MenuPage } from './pages/MenuPage';
import { Daily } from './pages/Daily';
import { Careers } from './pages/Careers';
import { Reviews } from './pages/Reviews';

const PAGES = {
  home: Home,
  menu: MenuPage,
  daily: Daily,
  careers: Careers,
  reviews: Reviews,
} as const;

export function App() {
  const route = useHashRoute();
  const { t } = useLocale();
  const still = useReducedMotion();
  const Page = PAGES[route];

  /* A fresh page always starts at the top — 'instant' rather than 'auto',
     because 'auto' defers to `html { scroll-behavior: smooth }` and would turn
     the reset into a long animated scroll racing the page swap. */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);

  return (
    <>
      <span id="top" />
      <a className="skip-link" href="#main">
        {t('meta.skip')}
      </a>

      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Header />

      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          {/* No `filter` here on purpose: a filtered ancestor becomes the
              containing block for position:fixed and would break overlays. */}
          <motion.div
            key={route}
            initial={still ? undefined : { opacity: 0, y: 18 }}
            animate={still ? undefined : { opacity: 1, y: 0 }}
            exit={still ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Page />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}
