import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { cafe } from '../data/cafe';
import { categories } from '../data/menu';
import { useLocale } from '../i18n/context';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useFocusTrap } from '../hooks/useFocusTrap';
import type { MenuItem } from '../types';
import './DishModal.css';

const EASE = [0.16, 1, 0.3, 1] as const;

export function DishModal({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  const { t, pick, locale } = useLocale();
  const [shot, setShot] = useState(0);
  const [shownId, setShownId] = useState(item?.id);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const open = Boolean(item);

  useLockBodyScroll(open);
  useFocusTrap(panelRef, open);

  /* Opening a different dish rewinds the carousel — adjusted during render
     rather than in an effect, so there is no extra paint at frame zero. */
  if (item?.id !== shownId) {
    setShownId(item?.id);
    setShot(0);
  }

  const total = item?.images.length ?? 0;

  const step = useCallback(
    (delta: number) => {
      if (total < 2) return;
      setShot((current) => (current + delta + total) % total);
    },
    [total],
  );

  /* Focus lands on Close exactly once per opening. Kept apart from the key
     handler below, whose deps change identity on every parent render — merged,
     it would yank focus back out of the carousel while the visitor is tabbing. */
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, step]);

  const category = item ? categories.find((c) => c.id === item.category) : undefined;

  /* Rendered into <body> so no transformed or filtered ancestor can ever
     become the containing block for this fixed overlay. */
  return createPortal(
    <AnimatePresence>
      {item ? (
        <motion.div
          className="dm"
          role="dialog"
          aria-modal="true"
          aria-label={pick(item.name)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <button
            type="button"
            className="dm__scrim"
            onClick={onClose}
            aria-label={t('common.close')}
            tabIndex={-1}
          />

          <motion.div
            ref={panelRef}
            className="dm__panel"
            initial={{ y: 46, scale: 0.985, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.99, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <button ref={closeRef} type="button" className="dm__close" onClick={onClose}>
              <span className="sr-only">{t('common.close')}</span>
              <span aria-hidden="true">✕</span>
            </button>

            <div className="dm__media">
              {item.images.length ? (
                <>
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.img
                      key={item.images[shot]}
                      className="dm__img"
                      src={item.images[shot]}
                      alt={pick(item.name)}
                      initial={{ opacity: 0, scale: 1.045 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.62, ease: EASE }}
                      drag={total > 1 ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.16}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -60) step(1);
                        if (info.offset.x > 60) step(-1);
                      }}
                    />
                  </AnimatePresence>

                  {total > 1 ? (
                    <>
                      <button
                        type="button"
                        className="dm__arrow dm__arrow--prev"
                        onClick={() => step(-1)}
                        aria-label={t('common.prev')}
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        className="dm__arrow dm__arrow--next"
                        onClick={() => step(1)}
                        aria-label={t('common.next')}
                      >
                        →
                      </button>
                      <div className="dm__dots">
                        {item.images.map((src, i) => (
                          <button
                            key={src}
                            type="button"
                            className={`dm__dot${i === shot ? ' is-on' : ''}`}
                            onClick={() => setShot(i)}
                            aria-label={`${t('common.photo')} ${i + 1}`}
                            aria-current={i === shot}
                          />
                        ))}
                      </div>
                    </>
                  ) : null}
                </>
              ) : (
                <div className="dm__noshot">
                  <span className="dm__initial" aria-hidden="true">
                    {pick(item.name).charAt(0)}
                  </span>
                  <span className="label dm__soon">{t('common.soon')}</span>
                </div>
              )}
            </div>

            <div className="dm__body">
              <div className="dm__top">
                <span className="num dm__index">{item.index}</span>
                {category ? <span className="label dm__cat">{pick(category.title)}</span> : null}
              </div>

              <h2 className="dm__name display display--xl">{pick(item.name)}</h2>

              <div className="dm__pricerow">
                <span className="price dm__price">
                  {item.price} {t('common.currency')}
                </span>
                {item.tags?.length ? (
                  <ul className="dm__tags">
                    {item.tags.map((tg) => (
                      <li key={tg.ru} className="label dm__tagpill">
                        {pick(tg)}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <p className="dm__desc">{pick(item.desc)}</p>

              <div className="dm__foot">
                <span className="label dm__footcap">{cafe.addressFull[locale]}</span>
                <a className="btn btn--sm dm__cta" href={cafe.phone.href} data-cursor="link">
                  {t('common.call')}
                  <span className="btn__arrow">→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
