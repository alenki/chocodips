import { cafeInfo } from '../data/cafeInfo';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <img src="/data/logo_footer.png" alt="ChocoDips" className="footer__logo" />
      <p className="footer__tagline">{cafeInfo.tagline}</p>
      <p className="footer__address">{cafeInfo.address}</p>
      <a
        href={cafeInfo.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="footer__instagram"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
        {cafeInfo.instagramHandle}
      </a>
      <div className="footer__bottom">
        <span>&copy; 2026 ChocoDips</span>
        <span>&middot;</span>
        <span>made by <a href="https://t.me/kaaboronov" target="_blank" rel="noopener noreferrer">KARAF</a></span>
      </div>
    </footer>
  );
}
