import { useState, useEffect, useRef } from 'react';
import { menuItems } from '../data/menuItems';
import type { MenuItem, MenuCategory } from '../types/menu';
import CategoryFilter from './CategoryFilter';
import MenuCard from './MenuCard';
import './MenuSection.css';

interface Props {
  onItemClick: (item: MenuItem) => void;
}

export default function MenuSection({ onItemClick }: Props) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory);

  // Re-trigger scroll reveal on filter change
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.scroll-reveal');
    cards.forEach((card) => card.classList.remove('revealed'));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 }
    );

    // Small delay to allow DOM update
    requestAnimationFrame(() => {
      const freshCards = gridRef.current?.querySelectorAll('.scroll-reveal');
      freshCards?.forEach((card) => observer.observe(card));
    });

    return () => observer.disconnect();
  }, [activeCategory]);

  return (
    <section className="menu-section" id="menu">
      <div className="menu-section__header">
        <h2 className="menu-section__title">Наше Меню</h2>
        <p className="menu-section__subtitle">Авторские десерты ручной работы</p>
      </div>
      <div className="menu-section__filters">
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      </div>
      <div className="menu-section__grid" ref={gridRef}>
        {filtered.map((item, i) => (
          <MenuCard
            key={item.id}
            item={item}
            index={i}
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
    </section>
  );
}
