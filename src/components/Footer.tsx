import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <a href="#hero" className="footer__logo">
            <img src="/data/logo.png" alt="ChocoDips" />
          </a>

          <div className="footer__social">
            <a
              href="https://instagram.com/chocodips"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>

          <p className="footer__copyright">
            &copy; {currentYear} ChocoDips. Нальчик
          </p>
        </div>
      </div>
    </footer>
  );
}
