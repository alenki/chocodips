import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { MenuItem } from '../types/menu';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useImageCarousel } from '../hooks/useImageCarousel';
import './ItemModal.css';

interface Props {
  item: MenuItem | null;
  onClose: () => void;
}

export default function ItemModal({ item, onClose }: Props) {
  const isOpen = item !== null;
  const images = item?.images ?? [];
  const carousel = useImageCarousel(images);

  useBodyScrollLock(isOpen);

  // Reset carousel when item changes
  useEffect(() => {
    carousel.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          className="item-modal__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="item-modal"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="item-modal__close" onClick={onClose} aria-label="Закрыть">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            <div
              className="item-modal__images"
              onTouchStart={carousel.onTouchStart}
              onTouchEnd={carousel.onTouchEnd}
            >
              <div className="item-modal__carousel">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[carousel.index]}
                    src={images[carousel.index]}
                    alt={item.name}
                    className="item-modal__carousel-img"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>
              </div>

              {images.length > 1 && (
                <>
                  <button
                    className="item-modal__carousel-nav item-modal__carousel-nav--prev"
                    onClick={carousel.prev}
                    aria-label="Предыдущее фото"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    className="item-modal__carousel-nav item-modal__carousel-nav--next"
                    onClick={carousel.next}
                    aria-label="Следующее фото"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                  <div className="item-modal__dots">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        className={`item-modal__dot${i === carousel.index ? ' item-modal__dot--active' : ''}`}
                        onClick={() => carousel.goTo(i)}
                        aria-label={`Фото ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="item-modal__info">
              <h3 className="item-modal__name">{item.name}</h3>
              <p className="item-modal__price">{item.price} &#8381;</p>
              <p className="item-modal__description">{item.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
