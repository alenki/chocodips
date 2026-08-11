import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cafe } from '../data/cafe';
import { useLocale } from '../i18n/context';
import type { CopyKey } from '../i18n/dict';
import { routePath, useHashRoute } from '../hooks/useHashRoute';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import type { Locale, RouteId } from '../types';
import { DripEdge } from './DripEdge';
import './Header.css';

const NAV: { id: RouteId; key: CopyKey; n: string }[] = [
  { id: 'home', key: 'nav.home', n: '01' },
  { id: 'menu', key: 'nav.menu', n: '02' },
  { id: 'daily', key: 'nav.daily', n: '03' },
  { id: 'careers', key: 'nav.careers', n: '04' },
  { id: 'reviews', key: 'nav.reviews', n: '05' },
];

const LOCALES: Locale[] = ['ru', 'en'];

/** Routes whose first screen is a chocolate slab — the transparent header
    inverts over them until the page scrolls and the cream backdrop appears. */
const DARK_HERO: ReadonlySet<RouteId> = new Set<RouteId>(['menu']);

export function Header() {
  const { t, locale, setLocale } = useLocale();
  const route = useHashRoute();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useLockBodyScroll(open);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 320 && y > lastY.current);
        lastY.current = y;
        frame = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Any route change — link, back button, or hash edit — drops the overlay. */
  const [shownRoute, setShownRoute] = useState(route);
  if (route !== shownRoute) {
    setShownRoute(route);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  /* While the overlay is up, the page behind it must not be tabbable. The
     header itself stays live so the close button remains reachable. */
  useEffect(() => {
    if (!open) return;
    const behind = [document.getElementById('main'), document.querySelector('footer')];
    behind.forEach((node) => node?.setAttribute('inert', ''));
    return () => behind.forEach((node) => node?.removeAttribute('inert'));
  }, [open]);

  const inverted = open || (!scrolled && DARK_HERO.has(route));

  return (
    <>
      <header
        className={`hd${scrolled ? ' hd--solid' : ''}${hidden && !open ? ' hd--up' : ''}${
          open ? ' hd--open' : ''
        }${inverted ? ' hd--inv' : ''}`}
      >
        <div className="hd__inner">
          <a
            className="hd__logo"
            href={routePath.home}
            aria-label={cafe.name}
            data-cursor="link"
            onClick={() => setOpen(false)}
          >
            <img
              src={inverted ? cafe.logoFooter : cafe.logo}
              alt={cafe.name}
              width={679}
              height={469}
            />
          </a>

          <nav className="hd__nav" aria-label={t('nav.pages')}>
            {NAV.map((item) => (
              <a
                key={item.id}
                href={routePath[item.id]}
                className={`hd__link${route === item.id ? ' is-active' : ''}`}
                data-cursor="link"
              >
                <span className="hd__link-n">{item.n}</span>
                <span className="hd__link-t">{t(item.key)}</span>
              </a>
            ))}
          </nav>

          <div className="hd__right">
            <div className="hd__lang" role="group" aria-label={t('nav.lang')}>
              {LOCALES.map((code) => (
                <button
                  key={code}
                  type="button"
                  className={`hd__lang-btn${locale === code ? ' is-active' : ''}`}
                  onClick={() => setLocale(code)}
                  aria-pressed={locale === code}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>

            <a className="hd__phone" href={cafe.phone.href} data-cursor="link">
              <span className="hd__phone-dot" />
              {cafe.phone.display}
            </a>

            <button
              type="button"
              className={`hd__burger${open ? ' is-open' : ''}`}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? t('nav.close') : t('nav.open')}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <span className="hd__rule" />
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="ov"
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="ov__body">
              <nav className="ov__nav" aria-label={t('nav.pages')}>
                {NAV.map((item, i) => (
                  <motion.a
                    key={item.id}
                    href={routePath[item.id]}
                    className={`ov__link${route === item.id ? ' is-active' : ''}`}
                    initial={{ opacity: 0, y: 34 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.24 + i * 0.075, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setOpen(false)}
                  >
                    <span className="ov__n">{item.n}</span>
                    <span className="ov__t display display--xl">{t(item.key)}</span>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                className="ov__foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.62, duration: 0.7 }}
              >
                <div className="ov__col">
                  <span className="label ov__cap">{t('common.address')}</span>
                  <p>{cafe.addressFull[locale]}</p>
                </div>
                <div className="ov__col">
                  <span className="label ov__cap">{t('common.hours')}</span>
                  <p>
                    {cafe.hours.label[locale]} · {cafe.hours.value}
                  </p>
                </div>
                <div className="ov__col">
                  <span className="label ov__cap">{t('common.phone')}</span>
                  <p>
                    <a href={cafe.phone.href}>{cafe.phone.display}</a>
                  </p>
                  <p>
                    <a href={cafe.instagram.href} target="_blank" rel="noreferrer">
                      {cafe.instagram.handle}
                    </a>
                  </p>
                </div>
              </motion.div>
            </div>

            <DripEdge from="var(--cocoa-900)" to="transparent" size="sm" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
