import './Hero.css';

export default function Hero() {
  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      {/* Decorative chocolate drips */}
      <div className="hero__drips">
        <svg className="hero__drip hero__drip--1" viewBox="0 0 40 120" fill="none">
          <path d="M20 0C20 0 0 80 0 95C0 108.807 8.954 120 20 120C31.046 120 40 108.807 40 95C40 80 20 0 20 0Z" fill="currentColor"/>
        </svg>
        <svg className="hero__drip hero__drip--2" viewBox="0 0 30 90" fill="none">
          <path d="M15 0C15 0 0 60 0 71.25C0 81.605 6.716 90 15 90C23.284 90 30 81.605 30 71.25C30 60 15 0 15 0Z" fill="currentColor"/>
        </svg>
        <svg className="hero__drip hero__drip--3" viewBox="0 0 35 100" fill="none">
          <path d="M17.5 0C17.5 0 0 66.67 0 79.17C0 90.07 7.835 100 17.5 100C27.165 100 35 90.07 35 79.17C35 66.67 17.5 0 17.5 0Z" fill="currentColor"/>
        </svg>
        <svg className="hero__drip hero__drip--4" viewBox="0 0 25 75" fill="none">
          <path d="M12.5 0C12.5 0 0 50 0 59.375C0 67.55 5.596 75 12.5 75C19.404 75 25 67.55 25 59.375C25 50 12.5 0 12.5 0Z" fill="currentColor"/>
        </svg>
      </div>

      <div className="hero__content container">
        <div className="hero__logo-wrapper">
          <img
            src="/data/logo.png"
            alt="ChocoDips Logo"
            className="hero__logo"
          />
        </div>

        <p className="hero__tagline">
          Шоколадные десерты с душой
        </p>

        <p className="hero__subtitle">
          Нальчик
        </p>

        <button className="btn btn-primary hero__cta" onClick={scrollToMenu}>
          Смотреть меню
        </button>
      </div>

      {/* Decorative bottom wave */}
      <div className="hero__wave">
        <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none">
          <path d="M0 100V60C240 20 480 0 720 0C960 0 1200 20 1440 60V100H0Z" fill="var(--cream)"/>
        </svg>
      </div>
    </section>
  );
}
