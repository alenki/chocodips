import { cafeInfo } from '../data/cafeInfo';
import { useScrollReveal } from '../hooks/useScrollReveal';
import CafeMap from './CafeMap';
import './Location.css';

export default function Location() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section className="location" id="contact" ref={sectionRef}>
      <div className="location__inner">
        <h2 className="location__title scroll-reveal">Где Нас Найти</h2>

        <div className="location__info-grid scroll-reveal" style={{ '--stagger-index': 1 } as React.CSSProperties}>
          <div className="location__info-block">
            <svg className="location__info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="location__info-label">Адрес</p>
            <p className="location__info-value">{cafeInfo.address}</p>
          </div>

          <div className="location__info-block">
            <svg className="location__info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <p className="location__info-label">Часы работы</p>
            <div className="location__info-value">
              <div className="location__hours-row">
                <div className="location__hours-item">
                  <span className="location__hours-day">Пн-Пт</span>
                  <span className="location__hours-time">{cafeInfo.hours.weekdays}</span>
                </div>
              </div>
              <div className="location__hours-row">
                <div className="location__hours-item">
                  <span className="location__hours-day">Сб-Вс</span>
                  <span className="location__hours-time">{cafeInfo.hours.weekends}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="location__info-block">
            <svg className="location__info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            <p className="location__info-label">Подписывайтесь</p>
            <p className="location__info-value">
              <a href={cafeInfo.instagram} target="_blank" rel="noopener noreferrer">
                {cafeInfo.instagramHandle}
              </a>
            </p>
          </div>
        </div>

        <div className="scroll-reveal" style={{ '--stagger-index': 2 } as React.CSSProperties}>
          <CafeMap />
        </div>
      </div>
    </section>
  );
}
