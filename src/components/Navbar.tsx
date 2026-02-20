import { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { href: '#menu', label: 'Меню' },
  { href: '#about', label: 'О нас' },
  { href: '#contact', label: 'Контакты' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <a href="#" className="navbar__logo">
          <img src="/data/chocodips.jpg" alt="ChocoDips" className="navbar__logo-img" />
        </a>

        <div className="navbar__links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </div>

        <div className="navbar__social">
          <a
            href="https://www.instagram.com/chocodips.co"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__social-link"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>

        <button
          className={`navbar__hamburger${mobileOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню навигации"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`navbar__mobile-overlay${mobileOpen ? ' navbar__mobile-overlay--open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="navbar__mobile-link"
            onClick={closeMobile}
          >
            {link.label}
          </a>
        ))}
        <a
          href="https://www.instagram.com/chocodips.co"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar__mobile-link"
          onClick={closeMobile}
        >
          Instagram
        </a>
      </div>
    </>
  );
}
