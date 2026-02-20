import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__image-side">
        <img
          src="/data/menu/ПРОФИТРОЛИ SABLE/image_1.png"
          alt="Профитроли Sable — авторский десерт ChocoDips"
          className="hero__image"
        />
      </div>
      <div className="hero__content-side">
        <img src="/data/logo.png" alt="ChocoDips" className="hero__logo" />
        <h1 className="hero__tagline">Шоколадные десерты с&nbsp;душой</h1>
        <span className="hero__location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Нальчик
        </span>
        <a href="#menu" className="hero__cta">
          Смотреть меню
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
