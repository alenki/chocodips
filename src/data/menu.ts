export type MenuCategory = 'chocolate' | 'crepes' | 'pancakes' | 'pastries' | 'specialty';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
}

export const categoryLabels: Record<MenuCategory, string> = {
  chocolate: 'Chocolate',
  crepes: 'Crepes',
  pancakes: 'Pancakes',
  pastries: 'Pastries',
  specialty: 'Specialty'
};

export const menuItems: MenuItem[] = [
  {
    id: 'choco-bum',
    name: 'CHOCO BOOM',
    description: 'A spectacular chocolate explosion — a hot dessert with a molten chocolate heart',
    price: 600,
    category: 'chocolate',
    image: '/data/menu/ЧОКО БУМ/image_1.png'
  },
  {
    id: 'brownie-crep',
    name: 'BROWNIE CREPE',
    description: 'A delicate crepe filled with chocolate brownie and drizzled with sauce',
    price: 390,
    category: 'crepes',
    image: '/data/menu/БРАУНИ-КРЕП/image_1.png'
  },
  {
    id: 'fondant',
    name: 'FONDANT',
    description: 'A classic French dessert with a molten chocolate center',
    price: 410,
    category: 'chocolate',
    image: '/data/menu/ФОНДАН/image_1.png'
  },
  {
    id: 'fondue',
    name: 'FONDUE',
    description: 'Hot chocolate fondue with fruits and marshmallows for dipping',
    price: 800,
    category: 'chocolate',
    image: '/data/menu/ФОНДЮ/image_1.png'
  },
  {
    id: 'pancakes-berries',
    name: 'PANCAKES WITH BERRIES',
    description: 'Fluffy pancakes with seasonal berries and cream',
    price: 410,
    category: 'pancakes',
    image: '/data/menu/ПАНКЕЙКИ С ЯГОДАМИ/image_1.png'
  },
  {
    id: 'pancakes-chocolate',
    name: 'PANCAKES WITH CHOCOLATE',
    description: 'Fluffy pancakes with rich chocolate sauce',
    price: 410,
    category: 'pancakes',
    image: '/data/menu/ПАНКЕЙКИ С ШОКОЛАДОМ/image_1.png'
  },
  {
    id: 'crep-roll',
    name: 'CREPE ROLL',
    description: 'A crepe rolled into an elegant roll with your choice of filling',
    price: 435,
    category: 'crepes',
    image: '/data/menu/КРЕП-РОЛЛ/image_1.png'
  },
  {
    id: 'burrata',
    name: 'BURRATA',
    description: 'A delicate crepe with Italian burrata cheese and sweet sauce',
    price: 390,
    category: 'crepes',
    image: '/data/menu/БУРРАТА/image_1.png'
  },
  {
    id: 'crep-banana-chocolate',
    name: 'BANANA CHOCOLATE CREPE',
    description: 'A classic combination — a thin crepe with banana and hot chocolate',
    price: 400,
    category: 'crepes',
    image: '/data/menu/КРЕП С БАНАНОМ И ШОКОЛАДОМ/image_1.png'
  },
  {
    id: 'sushi-crep',
    name: 'SUSHI CREPE',
    description: 'A creative sushi-style crepe presentation with unique toppings',
    price: 420,
    category: 'crepes',
    image: '/data/menu/СУШИ КРЕП/image_1.png'
  },
  {
    id: 'cinnabon',
    name: 'CINNABON',
    description: 'A fragrant cinnamon roll with creamy frosting',
    price: 330,
    category: 'pastries',
    image: '/data/menu/СИННАБОН/image_1.png'
  },
  {
    id: 'waffles',
    name: 'WAFFLES',
    description: 'Crispy Belgian waffles with your choice of topping',
    price: 390,
    category: 'pastries',
    image: '/data/menu/ВАФЛИ/image_1.png'
  },
  {
    id: 'profiteroli-sable',
    name: 'PROFITEROLES SABLE',
    description: 'Choux pastries with a creamy filling on a shortbread base',
    price: 750,
    category: 'specialty',
    image: '/data/menu/ПРОФИТРОЛИ SABLE/image_1.png'
  },
  {
    id: 'profiteroli-big-sable',
    name: 'PROFITEROLES BIG SABLE',
    description: 'A large serving of signature profiteroles — perfect for sharing',
    price: 2500,
    category: 'specialty',
    image: '/data/menu/ПРОФИТРОЛИ BIG SABLE/image_1.png'
  },
  {
    id: 'cheesecake',
    name: 'BASQUE CHEESECAKE',
    description: 'Basque-style cheesecake with a caramelized crust and creamy center',
    price: 390,
    category: 'specialty',
    image: '/data/menu/ЧИЗКЕЙК САН-САБАСТЬЯН/image_1.png'
  },
  {
    id: 'pistachio-knafe',
    name: 'PISTACHIO KNAFEH',
    description: 'A Middle Eastern delicacy with crispy kadaif pastry and pistachios',
    price: 700,
    category: 'specialty',
    image: '/data/menu/ФИСТАШКОВЫЙ КНАФЕ/image_1.png'
  },
  {
    id: 'date-dessert',
    name: 'DATE DESSERT',
    description: 'An exquisite dessert made with natural dates and nuts',
    price: 380,
    category: 'specialty',
    image: '/data/menu/ФИНИКОВЫЙ ДЕСЕРТ/image_1.png'
  }
];
