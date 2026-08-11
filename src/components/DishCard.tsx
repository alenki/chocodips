import { useLocale } from '../i18n/context';
import { countPhotos } from '../lib/plural';
import type { MenuItem } from '../types';
import './DishCard.css';

interface DishCardProps {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
  /** Cards in a row are given alternating heights to break the grid. */
  ratio?: 'tall' | 'square' | 'portrait';
  /** Register number shown in the corner. */
  showIndex?: boolean;
}

export function DishCard({ item, onOpen, ratio = 'portrait', showIndex = true }: DishCardProps) {
  const { t, pick, locale } = useLocale();
  const hasShot = item.images.length > 0;
  const hover = item.images[1];

  return (
    <article className={`dish dish--${ratio}${hasShot ? '' : ' dish--noshot'}`}>
      <button
        type="button"
        className="dish__hit"
        onClick={() => onOpen(item)}
        data-cursor={hasShot ? 'media' : 'link'}
        data-cursor-label={t('common.look')}
        aria-label={`${pick(item.name)} — ${item.price} ${t('common.currency')}`}
      >
        <div className="dish__frame frame frame--warm">
          {hasShot ? (
            <>
              <img
                className="dish__img"
                src={item.images[0]}
                alt={pick(item.name)}
                loading="lazy"
                decoding="async"
              />
              {hover ? (
                <img
                  className="dish__img dish__img--hover"
                  src={hover}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
            </>
          ) : (
            <span className="dish__initial" aria-hidden="true">
              {pick(item.name).charAt(0)}
            </span>
          )}

          {showIndex ? <span className="dish__n num">{item.index}</span> : null}

          {item.tags?.length ? (
            <span className="dish__tag label">{pick(item.tags[0])}</span>
          ) : null}

          {!hasShot ? <span className="dish__soon label">{t('common.soon')}</span> : null}

          {item.images.length > 1 ? (
            <span className="dish__count num">{countPhotos(item.images.length, locale)}</span>
          ) : null}
        </div>

        <div className="dish__foot">
          <h3 className={`dish__name display display--lg${locale === 'en' ? ' dish__name--en' : ''}`}>
            {pick(item.name)}
          </h3>
          <span className="dish__price price">
            {item.price} {t('common.currency')}
          </span>
        </div>

        <p className="dish__desc">{pick(item.desc)}</p>
      </button>
    </article>
  );
}
