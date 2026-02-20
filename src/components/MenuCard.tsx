import type { MenuItem } from '../types/menu';
import './MenuCard.css';

interface Props {
  item: MenuItem;
  index: number;
  onClick: () => void;
}

export default function MenuCard({ item, index, onClick }: Props) {
  return (
    <button
      className={`menu-card scroll-reveal${item.featured ? ' menu-card--featured' : ''}`}
      style={{ '--stagger-index': Math.min(index, 5) } as React.CSSProperties}
      onClick={onClick}
    >
      <div className="menu-card__image-wrap">
        <img
          src={item.images[0]}
          alt={item.name}
          className="menu-card__image"
          loading="lazy"
        />
      </div>
      <div className="menu-card__info">
        <span className="menu-card__name">{item.name}</span>
        <span className="menu-card__price">{item.price} &#8381;</span>
      </div>
    </button>
  );
}
