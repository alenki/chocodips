import { cafe, socials } from '../data/cafe';
import { useLocale } from '../i18n/context';
import type { CopyKey } from '../i18n/dict';
import { routePath, useHashRoute } from '../hooks/useHashRoute';
import { useOpenNow } from '../hooks/useOpenNow';
import { countPositions } from '../lib/plural';
import type { RouteId } from '../types';
import { itemCount, priceRange } from '../data/menu';
import { DripEdge } from './DripEdge';
import { Marquee } from './Marquee';
import { Reveal } from './Reveal';
import './Footer.css';

const NAV: { id: RouteId; key: CopyKey }[] = [
  { id: 'home', key: 'nav.home' },
  { id: 'menu', key: 'nav.menu' },
  { id: 'daily', key: 'nav.daily' },
  { id: 'careers', key: 'nav.careers' },
  { id: 'reviews', key: 'nav.reviews' },
];

/** Pages that already end on a chocolate slab — a cream drip would appear
    there as a stripe out of nowhere, so the seam stays flat instead. */
const DARK_TAIL: ReadonlySet<RouteId> = new Set<RouteId>(['menu', 'careers']);

export function Footer() {
  const { t, locale } = useLocale();
  const route = useHashRoute();
  const openNow = useOpenNow();
  const year = new Date().getFullYear();

  const ribbon =
    locale === 'ru'
      ? ['Крепы', 'Фондан', 'Профитроли', 'Кнафе', 'Фондю', 'Синнабон', 'Чизкейк']
      : ['Crêpes', 'Fondant', 'Profiteroles', 'Knafeh', 'Fondue', 'Cinnabon', 'Cheesecake'];

  return (
    <footer className="ft">
      {DARK_TAIL.has(route) ? null : (
        <DripEdge from="var(--cream)" to="var(--cocoa-900)" size="lg" flip />
      )}

      <div className="ft__ribbon">
        <Marquee items={ribbon} scale="display" tone="outline" speed={54} separator="◦" />
      </div>

      <div className="container ft__inner">
        <div className="ft__grid">
          <div className="ft__brand">
            <Reveal>
              <img
                className="ft__logo"
                src={cafe.logoFooter}
                alt={cafe.name}
                width={679}
                height={469}
              />
              <span className="label ft__credo">{t('footer.credo')}</span>
              <p className="ft__tagline display display--lg">{t('footer.tagline')}</p>
            </Reveal>
          </div>

          <nav className="ft__col" aria-label={t('footer.nav')}>
            <span className="label ft__cap">{t('footer.nav')}</span>
            <span className="ft__note">{t('footer.navNote')}</span>
            <ul className="ft__list">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a href={routePath[item.id]} className="ft__link" data-cursor="link">
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ft__col">
            <span className="label ft__cap">{t('footer.contacts')}</span>
            <span className="ft__note">{t('footer.contactsNote')}</span>
            <ul className="ft__list">
              {socials.map((item) => (
                <li key={item.id}>
                  <a
                    className="ft__link"
                    href={item.href}
                    target={item.href.startsWith('tel:') ? undefined : '_blank'}
                    rel="noreferrer"
                    data-cursor="link"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft__col">
            <span className="label ft__cap">{t('footer.where')}</span>
            <span className="ft__note">{t('footer.whereNote')}</span>
            <address className="ft__address">
              {cafe.addressFull[locale]}
              <br />
              {cafe.region[locale]}
            </address>
            <p className="ft__hours">
              {cafe.hours.label[locale]}
              <br />
              <span className="ft__hours-v">{cafe.hours.value}</span>
            </p>
            <p className={`ft__status${openNow ? ' is-open' : ''}`}>
              <span className="ft__status-dot" />
              {openNow ? t('status.open') : t('status.closed')}
            </p>
            <a
              className="tlink ft__route"
              href={cafe.routeHref}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
            >
              {t('common.route')} <span className="btn__arrow">↗</span>
            </a>
          </div>
        </div>

        <div className="ft__meta">
          <span className="label">
            {countPositions(itemCount, locale)} · {t('common.from')} {priceRange.min}{' '}
            {t('common.currency')}
          </span>
          <span className="label ft__meta-mid">{cafe.hours.value} · 7/7</span>
          <a href="#top" className="label ft__top" data-cursor="link">
            {t('footer.top')} ↑
          </a>
        </div>

        <div className="ft__base">
          <span className="label">
            © {year} {cafe.name} · {cafe.city[locale]}
          </span>
          <span className="label ft__rights">{t('footer.rights')}</span>
        </div>
      </div>
    </footer>
  );
}
