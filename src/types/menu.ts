export type MenuCategory = 'all' | 'chocolate' | 'crepe' | 'pancake' | 'pastry' | 'specialty';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: Exclude<MenuCategory, 'all'>;
  images: string[];
  description: string;
  featured?: boolean;
}

export interface CategoryOption {
  value: MenuCategory;
  label: string;
}
