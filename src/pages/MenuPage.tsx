import { useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useSpring } from 'motion/react';
import { cafe } from '../data/cafe';
import { allShots, itemCount, menuByCategory, priceRange } from '../data/menu';
import { useLocale } from '../i18n/context';
import { countPositions } from '../lib/plural';
import { useFinePointer } from '../hooks/useMediaQuery';
import type { MenuItem } from '../types';
import { DishModal } from '../components/DishModal';
import { DripEdge } from '../components/DripEdge';
import { Reveal, RevealLine } from '../components/Reveal';
import './MenuPage.css';

const HALF = Math.ceil(allShots.length / 2);

/** Must match `translate` on .peek in MenuPage.css (3.9rem). */
const PEEK_OFFSET = 62.4;
const PEEK_MARGIN = 16;

export function MenuPage() {
  const { t, pick, locale } = useLocale();
  const fine = useFinePointer();
  const [active, setActive] = useState<MenuItem | null>(null);
  const [peek, setPeek] = useState<MenuItem | null>(null);

  /* The preview trails the pointer on a spring — set() to follow, jump() on
     first entry so the card appears where the cursor already is. */
  const sx = useSpring(0, { stiffness: 260, damping: 30, mass: 0.5 });
  const sy = useSpring(0, { stiffness: 260, damping: 30, mass: 0.5 });

  /**
   * The card is drawn at (x + PEEK_OFFSET, y - 52%), so the raw pointer
   * position has to be clamped or it runs off the right edge on a menu row's
   * far side. Mirrors the CSS in .peek.
   */
  const clamped = (clientX: number, clientY: number) => {
    const w = Math.min(280, Math.max(200, window.innerWidth * 0.17));
    const h = (w * 4) / 3;
    const maxX = window.innerWidth - w - PEEK_OFFSET - PEEK_MARGIN;
    const minY = h * 0.52 + PEEK_MARGIN;
    const maxY = window.innerHeight - h * 0.48 - PEEK_MARGIN;
    return {
      x: Math.max(PEEK_MARGIN, Math.min(clientX, maxX)),
      y: Math.max(minY, Math.min(clientY, maxY)),
    };
  };

  const track = (event: React.MouseEvent) => {
    const { x, y } = clamped(event.clientX, event.clientY);
    sx.set(x);
    sy.set(y);
  };

  const enter = (item: MenuItem, event: React.MouseEvent) => {
    if (!fine || item.images.length === 0) return;
    const { x, y } = clamped(event.clientX, event.clientY);
    sx.jump(x);
    sy.jump(y);
    setPeek(item);
  };

  return (
    <>
      {/* ================================================================ HERO */}
      <section className="mh slab">
        <div className="container mh__inner">
          <Reveal>
            <span className="eyebrow eyebrow--molten">{t('menu.eyebrow')}</span>
          </Reveal>

          <h1 className="mh__h display display--giant">
            <RevealLine delay={0.04}>{t('menu.l1')}</RevealLine>
            <RevealLine delay={0.15}>
              <span className="em em--molten">{t('menu.l2')}</span>
            </RevealLine>
          </h1>

          <div className="mh__grid">
            <Reveal delay={0.2}>
              <p className="lede mh__lede">{t('menu.lede')}</p>
            </Reveal>

            <Reveal delay={0.3} className="mh__facts">
              <div className="mh__fact">
                <span className="label mh__fact-k">{t('menu.priceFrom')}</span>
                <span className="mh__fact-v display">
                  {priceRange.min} {t('common.currency')}
                </span>
              </div>
              <div className="mh__fact">
                <span className="label mh__fact-k">{cafe.hours.label[locale]}</span>
                <span className="mh__fact-v display">{cafe.hours.value}</span>
              </div>
              <div className="mh__fact">
                <span className="label mh__fact-k">{t('menu.factCount')}</span>
                <span className="mh__fact-v display">{itemCount}</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.4}>
            <div className="mh__cta">
              <a className="btn btn--molten" href={cafe.phone.href} data-cursor="link">
                {cafe.phone.display}
              </a>
              <a
                className="btn btn--ghost-inv"
                href={cafe.instagram.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
              >
                {t('common.instagram')}
                <span className="btn__arrow">↗</span>
              </a>
              <span className="label mh__hint">{fine ? t('menu.hint') : t('menu.hintTouch')}</span>
            </div>
          </Reveal>
        </div>

        <DripEdge from="var(--cocoa-900)" to="var(--cream)" size="lg" />
      </section>

      {/* ============================================================ REGISTER */}
      <section className="section reg">
        <div className="container">
          {menuByCategory.map(({ category, items }, ci) => (
            <div className="reg__cat" key={category.id}>
              <div className="reg__cathead">
                <Reveal>
                  <span className="reg__roman display">{category.index}</span>
                </Reveal>
                <div className="reg__cattext">
                  <h2 className="reg__cattitle display display--xl">
                    <RevealLine delay={0.04}>{pick(category.title)}</RevealLine>
                  </h2>
                  <Reveal delay={0.12}>
                    <p className="reg__catnote">{pick(category.note)}</p>
                  </Reveal>
                </div>
                <Reveal delay={0.18} className="reg__catcount">
                  <span className="label">{countPositions(items.length, locale)}</span>
                </Reveal>
              </div>

              <ul className="reg__rows">
                {items.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
                    transition={{
                      duration: 0.75,
                      delay: Math.min(i * 0.055, 0.32),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <button
                      type="button"
                      className={`reg__row${item.images.length ? '' : ' reg__row--noshot'}`}
                      onClick={() => setActive(item)}
                      onMouseEnter={(event) => enter(item, event)}
                      onMouseMove={track}
                      onMouseLeave={() => setPeek(null)}
                      data-cursor={item.images.length ? 'media' : 'link'}
                      data-cursor-label={t('common.look')}
                    >
                      <span className="reg__n num">{item.index}</span>

                      <span className="reg__body">
                        <span className="reg__top">
                          <span className="reg__name display display--lg">{pick(item.name)}</span>
                          <span className="reg__dots" aria-hidden="true" />
                          <span className="reg__price price">
                            {item.price} {t('common.currency')}
                          </span>
                        </span>
                        <span className="reg__meta">
                          <span className="reg__desc">{pick(item.desc)}</span>
                          {item.tags?.length ? (
                            <span className="reg__tag label">{pick(item.tags[0])}</span>
                          ) : null}
                        </span>
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              {ci < menuByCategory.length - 1 ? <span className="reg__sep" /> : null}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================= RIBBONS */}
      <section className="rib-sec">
        <div className="container rib-sec__head">
          <Reveal>
            <span className="eyebrow">{t('menu.gallery.eyebrow')}</span>
          </Reveal>
          <h2 className="rib-sec__h display display--xl">
            <RevealLine delay={0.05}>{t('menu.gallery.title')}</RevealLine>
          </h2>
          <Reveal delay={0.14}>
            <p className="rib-sec__note">{t('menu.gallery.note')}</p>
          </Reveal>
        </div>

        <Ribbon shots={allShots.slice(0, HALF)} onOpen={setActive} />
        <Ribbon shots={allShots.slice(HALF)} onOpen={setActive} reverse />
      </section>

      {/* ================================================================= CTA */}
      <section className="mcta slab">
        <div className="container mcta__inner">
          <div>
            <Reveal>
              <span className="eyebrow eyebrow--molten">{cafe.city[locale]}</span>
            </Reveal>
            <h2 className="mcta__h display display--giant">
              <RevealLine delay={0.05}>{t('menu.cta.l1')}</RevealLine>
              <RevealLine delay={0.16}>
                <span className="em em--molten">{t('menu.cta.l2')}</span>
              </RevealLine>
            </h2>
          </div>

          <Reveal delay={0.2} className="mcta__side">
            <p className="lede mcta__note">{t('menu.cta.note')}</p>
            <div className="mcta__btns">
              <a className="btn btn--molten" href={cafe.phone.href} data-cursor="link">
                {t('common.call')}
              </a>
              <a
                className="btn btn--ghost-inv"
                href={cafe.routeHref}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
              >
                {t('common.route')}
                <span className="btn__arrow">↗</span>
              </a>
            </div>
            <span className="label mcta__addr">{cafe.addressFull[locale]}</span>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ cursor-bound preview
          Portalled to <body> so it is positioned against the viewport rather
          than against any transformed ancestor. */}
      {createPortal(
        <AnimatePresence>
          {fine && peek ? (
            <motion.div
              className="peek"
              style={{ x: sx, y: sy }}
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            >
              <img src={peek.images[0]} alt="" />
              <span className="peek__cap label">
                {peek.price} {t('common.currency')}
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )}

      <DishModal item={active} onClose={() => setActive(null)} />
    </>
  );
}

/* ========================================================================== */

function Ribbon({
  shots,
  onOpen,
  reverse = false,
}: {
  shots: { src: string; item: MenuItem }[];
  onOpen: (item: MenuItem) => void;
  reverse?: boolean;
}) {
  const { t, pick } = useLocale();

  const track = (copy: number) => (
    <div className="rib__track" key={copy}>
      {shots.map(({ src, item }, i) => (
        <button
          type="button"
          className="rib__cell"
          key={`${src}-${copy}-${i}`}
          onClick={() => onOpen(item)}
          tabIndex={copy === 0 ? 0 : -1}
          aria-hidden={copy === 1}
          data-cursor="media"
          data-cursor-label={t('common.look')}
        >
          <img src={src} alt={pick(item.name)} loading="lazy" decoding="async" />
          <span className="rib__cap">
            <span className="label">{pick(item.name)}</span>
            <span className="label rib__cap-p">
              {item.price} {t('common.currency')}
            </span>
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="rib">
      <div className={`rib__row${reverse ? ' rib__row--rev' : ''}`}>{[track(0), track(1)]}</div>
    </div>
  );
}
