import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { cafe, ticker } from '../data/cafe';
import { featured, itemCount, menu, priceRange } from '../data/menu';
import { journal } from '../data/journal';
import { useLocale } from '../i18n/context';
import { countPositions } from '../lib/plural';
import { routePath } from '../hooks/useHashRoute';
import { useOpenNow } from '../hooks/useOpenNow';
import type { MenuItem } from '../types';
import { CafeMapLazy } from '../components/CafeMapLazy';
import { DishCard } from '../components/DishCard';
import { DishModal } from '../components/DishModal';
import { DripEdge } from '../components/DripEdge';
import { Marquee } from '../components/Marquee';
import { Reveal, RevealLine, RevealWords, Stagger, StaggerItem } from '../components/Reveal';
import './Home.css';

const byId = (id: string) => menu.find((item) => item.id === id)!;

const HERO_SHOT = byId('choco-boom');
const HERO_SUB = byId('pistachio-knafeh');
const ABOUT_SHOT_A = byId('brownie-crepe');
const ABOUT_SHOT_B = byId('pancakes-berries');
const JOURNAL_SHOT = byId('crepe-roll');

/* Cards are given alternating proportions so the grid never reads as a table. */
const RATIOS = ['tall', 'portrait', 'tall', 'portrait', 'tall', 'portrait'] as const;

export function Home() {
  const { t, pick, locale } = useLocale();
  const openNow = useOpenNow();
  const still = useReducedMotion();
  const [active, setActive] = useState<MenuItem | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const shotY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const subY = useTransform(scrollYProgress, [0, 1], ['0%', '-16%']);
  const typeY = useTransform(scrollYProgress, [0, 1], ['0%', '26%']);

  return (
    <>
      {/* ================================================================ HERO */}
      <section className="hero" ref={heroRef}>
        <span className="hero__glow" aria-hidden="true" />

        <div className="hero__rail" aria-hidden="true">
          <span className="label hero__rail-t">{t('common.scroll')}</span>
          <span className="hero__rail-line" />
        </div>

        <div className="container hero__inner">
          <motion.div className="hero__type" style={still ? undefined : { y: typeY }}>
            <motion.span
              className="eyebrow hero__eyebrow"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('home.hero.eyebrow')}
            </motion.span>

            <h1 className="hero__h display display--mega">
              <span className="hero__l1">
                <RevealWords text={t('home.hero.l1')} delay={0.24} />
              </span>
              <span className="hero__l2">
                <RevealWords text={t('home.hero.l2')} delay={0.5} className="em em--molten" />
              </span>
            </h1>

            <Reveal delay={0.95} distance={22}>
              <p className="lede hero__lede">{t('home.hero.lede')}</p>
            </Reveal>

            <Reveal delay={1.1} distance={18}>
              <div className="hero__cta">
                <a className="btn btn--solid" href={routePath.menu} data-cursor="link">
                  {t('common.menu')}
                  <span className="btn__arrow">→</span>
                </a>
                <a className="btn" href={cafe.phone.href} data-cursor="link">
                  {t('common.call')}
                </a>
              </div>
            </Reveal>

            <Reveal delay={1.24} distance={14}>
              <div className="hero__meta">
                <span className="label">{countPositions(itemCount, locale)}</span>
                <span className="hero__meta-dot" />
                <span className="label">{cafe.hours.value}</span>
                <span className="hero__meta-dot" />
                <span className="label">{cafe.street[locale]}</span>
              </div>
            </Reveal>
          </motion.div>

          <div className="hero__media">
            <motion.figure
              className="hero__shot hero__shot--main frame frame--warm"
              style={still ? undefined : { y: shotY }}
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.5, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
            >
              <img
                src={HERO_SHOT.images[0]}
                alt={pick(HERO_SHOT.name)}
                fetchPriority="high"
                decoding="async"
              />
              <figcaption className="hero__cap">
                <span className="label">{pick(HERO_SHOT.name)}</span>
                <span className="label hero__cap-p">
                  {HERO_SHOT.price} {t('common.currency')}
                </span>
              </figcaption>
            </motion.figure>

            <motion.figure
              className="hero__shot hero__shot--sub frame frame--warm"
              style={still ? undefined : { y: subY }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={HERO_SUB.images[0]} alt={pick(HERO_SUB.name)} loading="lazy" />
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ============================================================== TICKER */}
      <div className="band">
        <Marquee items={ticker[locale]} tone="cream" speed={46} separator="◦" />
      </div>

      {/* =============================================================== ABOUT */}
      <section className="section about">
        <div className="container about__inner">
          <div className="about__lead">
            <Reveal>
              <span className="eyebrow">{t('home.about.eyebrow')}</span>
            </Reveal>

            <h2 className="about__h display display--giant">
              <RevealLine delay={0.05}>{t('home.about.l1')}</RevealLine>
              <RevealLine delay={0.16}>
                <span className="em em--molten">{t('home.about.l2')}</span>
              </RevealLine>
            </h2>

            <Reveal delay={0.2} className="about__prose prose">
              <p>{t('home.about.p1')}</p>
              <p>{t('home.about.p2')}</p>
              <p>{t('home.about.p3')}</p>
            </Reveal>

            <Reveal delay={0.3}>
              <dl className="about__stats">
                <div className="about__stat">
                  <dt className="about__stat-n display">{itemCount}</dt>
                  <dd className="label">{t('home.hero.stat1')}</dd>
                </div>
                <div className="about__stat">
                  <dt className="about__stat-n display">3</dt>
                  <dd className="label">{t('home.hero.stat2')}</dd>
                </div>
                <div className="about__stat">
                  <dt className="about__stat-n display">7/7</dt>
                  <dd className="label">{t('home.hero.stat3')}</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="about__media">
            <Reveal delay={0.1} direction="up" className="about__fig about__fig--a">
              <figure className="frame frame--warm frame--hover ratio-3-4">
                <img src={ABOUT_SHOT_A.images[0]} alt={pick(ABOUT_SHOT_A.name)} loading="lazy" />
              </figure>
              <figcaption className="about__figcap label">{t('home.about.figure1')}</figcaption>
            </Reveal>

            <Reveal delay={0.24} direction="up" className="about__fig about__fig--b">
              <figure className="frame frame--warm frame--hover ratio-4-5">
                <img src={ABOUT_SHOT_B.images[0]} alt={pick(ABOUT_SHOT_B.name)} loading="lazy" />
              </figure>
              <figcaption className="about__figcap label">{t('home.about.figure2')}</figcaption>
            </Reveal>

            <img className="about__seal" src={cafe.seal} alt="" aria-hidden="true" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ================================================================ PICK */}
      <section className="section pick">
        <div className="container">
          <div className="pick__head">
            <div>
              <Reveal>
                <span className="eyebrow">{t('home.menu.eyebrow')}</span>
              </Reveal>
              <h2 className="pick__h display display--giant">
                <RevealLine delay={0.05}>{t('home.menu.l1')}</RevealLine>
                <RevealLine delay={0.16}>
                  <span className="em em--molten">{t('home.menu.l2')}</span>
                </RevealLine>
              </h2>
            </div>

            <Reveal delay={0.2} className="pick__aside">
              <p className="pick__note">{t('home.menu.note')}</p>
              <a className="tlink pick__all" href={routePath.menu} data-cursor="link">
                {t('common.fullMenu')} <span className="btn__arrow">→</span>
              </a>
            </Reveal>
          </div>

          <Stagger className="pick__grid">
            {featured.map((item, i) => (
              <StaggerItem key={item.id} className={`pick__cell pick__cell--${i % 3}`}>
                <DishCard item={item} onOpen={setActive} ratio={RATIOS[i]} />
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="pick__foot">
            <a className="btn btn--solid" href={routePath.menu} data-cursor="link">
              {t('common.fullMenu')} — {countPositions(itemCount, locale)}
              <span className="btn__arrow">→</span>
            </a>
            <span className="label pick__from">
              {t('menu.priceFrom')} {priceRange.min} {t('common.currency')}
            </span>
          </Reveal>
        </div>
      </section>

      {/* =============================================================== DAILY */}
      <section className="jrnl slab">
        <div className="container jrnl__inner">
          <div className="jrnl__type">
            <Reveal>
              <span className="eyebrow eyebrow--molten">{t('home.daily.eyebrow')}</span>
            </Reveal>

            <h2 className="jrnl__h display display--giant">
              <RevealLine delay={0.05}>{t('home.daily.l1')}</RevealLine>
              <RevealLine delay={0.16}>
                <span className="em em--molten">{t('home.daily.l2')}</span>
              </RevealLine>
            </h2>

            <Reveal delay={0.2}>
              <p className="lede jrnl__lede">{t('home.daily.lede')}</p>
            </Reveal>

            <Reveal delay={0.3}>
              <a className="btn btn--ghost-inv" href={routePath.daily} data-cursor="link">
                {t('common.readDaily')}
                <span className="btn__arrow">→</span>
              </a>
            </Reveal>
          </div>

          <div className="jrnl__media">
            <Reveal delay={0.12} direction="up">
              <figure className="jrnl__shot frame frame--warm frame--hover ratio-2-3">
                <img src={JOURNAL_SHOT.images[0]} alt={pick(JOURNAL_SHOT.name)} loading="lazy" />
              </figure>
            </Reveal>

            {journal[0].pull ? (
              <Reveal delay={0.28}>
                <blockquote className="jrnl__quote">
                  <span className="jrnl__mark" aria-hidden="true">
                    “
                  </span>
                  <p className="display display--lg">{pick(journal[0].pull)}</p>
                  <cite className="label jrnl__cite">
                    {journal[0].index} — {pick(journal[0].kicker)}
                  </cite>
                </blockquote>
              </Reveal>
            ) : null}
          </div>
        </div>

        <DripEdge from="var(--cocoa-900)" to="var(--cream)" size="lg" />
      </section>

      {/* ================================================================ FIND */}
      <section className="section find">
        <div className="container find__inner">
          <div className="find__type">
            <Reveal>
              <span className="eyebrow">{t('home.find.eyebrow')}</span>
            </Reveal>

            <h2 className="find__h display display--giant">
              <RevealLine delay={0.05}>{t('home.find.l1')}</RevealLine>
              <RevealLine delay={0.16}>
                <span className="em em--molten">{t('home.find.l2')}</span>
              </RevealLine>
            </h2>

            <Reveal delay={0.2}>
              <p className="lede find__note">{t('home.find.note')}</p>
            </Reveal>

            <Reveal delay={0.28}>
              <dl className="find__list">
                <div className="find__row">
                  <dt className="label">{t('common.address')}</dt>
                  <dd>
                    {cafe.addressFull[locale]}
                    <span className="find__sub">{cafe.region[locale]}</span>
                  </dd>
                </div>
                <div className="find__row">
                  <dt className="label">{t('common.hours')}</dt>
                  <dd>
                    {cafe.hours.label[locale]} · {cafe.hours.value}
                    <span className={`find__status${openNow ? ' is-open' : ''}`}>
                      <span className="find__dot" />
                      {openNow ? t('status.open') : t('status.closed')}
                    </span>
                  </dd>
                </div>
                <div className="find__row">
                  <dt className="label">{t('common.phone')}</dt>
                  <dd>
                    <a href={cafe.phone.href} data-cursor="link">
                      {cafe.phone.display}
                    </a>
                    <a
                      className="find__sub find__link"
                      href={cafe.instagram.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="link"
                    >
                      {cafe.instagram.handle}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.36}>
              <a
                className="btn btn--molten find__route"
                href={cafe.routeHref}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
              >
                {t('common.route')}
                <span className="btn__arrow">↗</span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.16} className="find__map">
            <CafeMapLazy />
          </Reveal>
        </div>
      </section>

      <DishModal item={active} onClose={() => setActive(null)} />
    </>
  );
}
