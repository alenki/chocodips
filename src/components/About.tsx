import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

export default function About() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section className="about" id="about" ref={sectionRef}>
      <img
        src="/data/menu/ФОНДАН/image_1.png"
        alt=""
        className="about__decor about__decor--1"
        aria-hidden="true"
      />
      <img
        src="/data/menu/СИННАБОН/image_1.png"
        alt=""
        className="about__decor about__decor--2"
        aria-hidden="true"
      />
      <div className="about__inner">
        <p className="about__label scroll-reveal" style={{ '--stagger-index': 0 } as React.CSSProperties}>
          О нас
        </p>
        <h2 className="about__heading scroll-reveal" style={{ '--stagger-index': 1 } as React.CSSProperties}>
          ChocoDips
        </h2>
        <p className="about__text scroll-reveal" style={{ '--stagger-index': 2 } as React.CSSProperties}>
          ChocoDips — это уютное пространство в самом сердце Нальчика, где шоколад становится искусством. Каждый наш десерт создаётся с любовью и вниманием к деталям, чтобы подарить вам момент настоящего наслаждения.
        </p>
        <p className="about__text scroll-reveal" style={{ '--stagger-index': 3 } as React.CSSProperties}>
          Мы верим, что хороший десерт — это больше, чем просто сладкое. Это момент радости, который вы разделяете с близкими. Наши крепы, панкейки и авторские десерты готовятся из лучших ингредиентов специально для вас.
        </p>
        <p className="about__text scroll-reveal" style={{ '--stagger-index': 4 } as React.CSSProperties}>
          Приходите ощутить нашу тёплую атмосферу и попробовать фирменные шоколадные творения. Мы всегда рады гостям!
        </p>
      </div>
    </section>
  );
}
