import { categories } from '../data/menuItems';
import type { MenuCategory } from '../types/menu';
import './CategoryFilter.css';

interface Props {
  active: MenuCategory;
  onChange: (category: MenuCategory) => void;
}

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="category-filter" role="tablist">
      {categories.map((cat) => (
        <button
          key={cat.value}
          role="tab"
          aria-selected={active === cat.value}
          className={`category-filter__pill category-filter__pill--${active === cat.value ? 'active' : 'inactive'}`}
          onClick={() => onChange(cat.value)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
