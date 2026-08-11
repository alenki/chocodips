import { Fragment } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { cafe } from '../data/cafe';
import { essayShots, journal } from '../data/journal';
import { useLocale } from '../i18n/context';
import { routePath } from '../hooks/useHashRoute';
import { DripEdge } from '../components/DripEdge';
import { Reveal, RevealLine, RevealWords } from '../components/Reveal';
import './Daily.css';

export function Daily() {
  const { t, pick, locale } = useLocale();
  const still = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stripRef,
    offset: ['start end', 'end start'],
  });
  const stripY = useTransform(scrollYProgress, [0, 1], ['-9%', '9%']);

  return (
    <>
      {/* ================================================================ HERO */}
      <section className="dh">
        <span className="dh__glow" aria-hidden="true" />
        <div className="container dh__inner">
          <Reveal>
            <span className="eyebrow">{t('daily.eyebrow')}</span>
          </Reveal>

          <h1 className="dh__h display display--mega">
            <RevealWords text={t('daily.l1')} delay={0.2} />
          </h1>

          <div className="dh__grid">
            <Reveal delay={0.35}>
              <p className="lede dh__lede">{t('daily.lede')}</p>
            </Reveal>

            <Reveal delay={0.45} className="dh__meta">
              <span className="label">
                {String(journal.length).padStart(2, '0')} — {t('daily.entriesLabel')}
              </span>
              <span className="label dh__meta-city">{cafe.city[locale]}</span>
            </Reveal>
          </div>
        </div>

        <div className="dh__strip" ref={stripRef}>
          <motion.img
            src={essayShots[1]}
            alt=""
            aria-hidden="true"
            style={still ? undefined : { y: stripY }}
            loading="lazy"
          />
        </div>
      </section>

      {/* ============================================================= ENTRIES */}
      <section className="section ents">
        <div className="container">
          {journal.map((entry, i) => (
            <Fragment key={entry.id}>
              <article className={`ent ent--${i % 2}`}>
                <Reveal className="ent__figwrap" direction={i % 2 ? 'right' : 'left'}>
                  <figure className="ent__fig frame frame--warm frame--hover ratio-3-4">
                    <img src={entry.image} alt={pick(entry.title)} loading="lazy" />
                  </figure>
                </Reveal>

                <div className="ent__text">
                  <Reveal>
                    <span className="ent__kick">
                      <span className="num ent__n">{entry.index}</span>
                      <span className="label">{pick(entry.kicker)}</span>
                    </span>
                  </Reveal>

                  <h2 className="ent__h display display--xl">
                    <RevealLine delay={0.05}>{pick(entry.title)}</RevealLine>
                  </h2>

                  <Reveal delay={0.14} className="ent__body prose">
                    {entry.body.map((para, pi) => (
                      <p key={pi}>{pick(para)}</p>
                    ))}
                  </Reveal>

                  {entry.pull ? (
                    <Reveal delay={0.2}>
                      <blockquote className="ent__pull">
                        <p className="display display--lg">{pick(entry.pull)}</p>
                      </blockquote>
                    </Reveal>
                  ) : null}
                </div>
              </article>

              {i === 1 ? (
                <div className="ents__break">
                  <span className="ents__rule" />
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </section>

      {/* =============================================================== CREDO */}
      <section className="credo slab">
        <div className="container credo__inner">
          <Reveal>
            <span className="eyebrow eyebrow--molten">{cafe.street[locale]}</span>
          </Reveal>
          <h2 className="credo__h display display--giant">
            <RevealLine delay={0.06}>{t('daily.cta')}</RevealLine>
          </h2>
          <Reveal delay={0.2}>
            <a className="btn btn--molten" href={routePath.menu} data-cursor="link">
              {t('common.menu')}
              <span className="btn__arrow">→</span>
            </a>
          </Reveal>
        </div>

        <DripEdge from="var(--cocoa-900)" to="var(--cream)" size="lg" flip />
      </section>

      {/* =============================================================== ESSAY */}
      <section className="section essay">
        <div className="container">
          <div className="essay__head">
            <Reveal>
              <span className="eyebrow">{t('daily.essay.eyebrow')}</span>
            </Reveal>
            <h2 className="essay__h display display--xl">
              <RevealLine delay={0.05}>{t('daily.essay.title')}</RevealLine>
            </h2>
          </div>

          <div className="essay__grid">
            {essayShots.map((src, i) => (
              <motion.figure
                key={src}
                className="essay__cell frame frame--warm frame--hover"
                initial={still ? undefined : { opacity: 0, y: 30, filter: 'blur(8px)' }}
                whileInView={still ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-6% 0px -6% 0px' }}
                transition={{
                  duration: 0.9,
                  delay: (i % 4) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <img src={src} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
