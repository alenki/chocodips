import { menuItems } from '../data/menuItems';
import type { MenuItem } from '../types/menu';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './FeaturedTrio.css';

const FEATURED_IDS = ['choco-boom', 'profiteroli-sable', 'pistachkoviy-knafe'];

interface Props {
  onItemClick: (item: MenuItem) => void;
}

export default function FeaturedTrio({ onItemClick }: Props) {
  const featured = FEATURED_IDS.map((id) => menuItems.find((item) => item.id === id)!);
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section className="featured-trio" ref={sectionRef}>
      <div className="featured-trio__inner">
        {featured.map((item, i) => (
          <button
            key={item.id}
            className="featured-trio__item scroll-reveal"
            style={{ '--stagger-index': i } as React.CSSProperties}
            onClick={() => onItemClick(item)}
          >
            <div className="featured-trio__image-wrap">
              <img src={item.images[0]} alt={item.name} loading="lazy" />
            </div>
            <span className="featured-trio__name">{item.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
