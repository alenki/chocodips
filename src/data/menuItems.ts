import type { MenuItem, CategoryOption } from '../types/menu';

export const categories: CategoryOption[] = [
  { value: 'all', label: 'Все' },
  { value: 'chocolate', label: 'Шоколад' },
  { value: 'crepe', label: 'Крепы' },
  { value: 'pancake', label: 'Панкейки' },
  { value: 'pastry', label: 'Выпечка' },
  { value: 'specialty', label: 'Особенные' },
];

export const menuItems: MenuItem[] = [
  {
    id: 'choco-boom',
    name: 'Чоко Бум',
    price: 490,
    category: 'chocolate',
    images: [
      '/data/menu/ЧОКО БУМ/image_1.png',
      '/data/menu/ЧОКО БУМ/image_2.png',
      '/data/menu/ЧОКО БУМ/image_3.png',
    ],
    description: 'Эффектный горячий десерт — шоколадная полусфера тает от горячего соуса, открывая нежную начинку внутри.',
    featured: true,
  },
  {
    id: 'brownie-crep',
    name: 'Брауни-Креп',
    price: 420,
    category: 'crepe',
    images: [
      '/data/menu/БРАУНИ-КРЕП/image_1.png',
      '/data/menu/БРАУНИ-КРЕП/image_2.png',
      '/data/menu/БРАУНИ-КРЕП/image_3.png',
    ],
    description: 'Тонкий креп с шоколадным брауни и карамельным соусом — идеальное сочетание текстур.',
    featured: true,
  },
  {
    id: 'fondan',
    name: 'Фондан',
    price: 450,
    category: 'chocolate',
    images: [
      '/data/menu/ФОНДАН/image_1.png',
    ],
    description: 'Классический французский десерт с жидким шоколадным центром, подаётся с шариком мороженого.',
    featured: true,
  },
  {
    id: 'profiteroli-sable',
    name: 'Профитроли Sable',
    price: 390,
    category: 'pastry',
    images: [
      '/data/menu/ПРОФИТРОЛИ SABLE/image_1.png',
      '/data/menu/ПРОФИТРОЛИ SABLE/image_2.png',
    ],
    description: 'Хрустящие профитроли с нежным кремом в шоколадной глазури — авторский рецепт шефа.',
  },
  {
    id: 'profiteroli-big-sable',
    name: 'Профитроли Big Sable',
    price: 520,
    category: 'pastry',
    images: [
      '/data/menu/ПРОФИТРОЛИ BIG SABLE/image_1.png',
      '/data/menu/ПРОФИТРОЛИ BIG SABLE/image_2.png',
    ],
    description: 'Увеличенная порция любимых профитролей — для настоящих сладкоежек.',
  },
  {
    id: 'pistachkoviy-knafe',
    name: 'Фисташковый Кнафе',
    price: 480,
    category: 'specialty',
    images: [
      '/data/menu/ФИСТАШКОВЫЙ КНАФЕ/image_1.png',
    ],
    description: 'Восточный десерт с хрустящим тестом кадаиф, сливочным сыром и фисташковой крошкой.',
  },
  {
    id: 'fondyu',
    name: 'Фондю',
    price: 650,
    category: 'chocolate',
    images: [
      '/data/menu/ФОНДЮ/image_1.png',
    ],
    description: 'Шоколадное фондю с фруктами и маршмеллоу — идеально для двоих.',
  },
  {
    id: 'cheesecake-san-sebastian',
    name: 'Чизкейк Сан-Себастьян',
    price: 420,
    category: 'pastry',
    images: [
      '/data/menu/ЧИЗКЕЙК САН-САБАСТЬЯН/image_1.png',
      '/data/menu/ЧИЗКЕЙК САН-САБАСТЬЯН/image_2.png',
    ],
    description: 'Баскский чизкейк с карамелизированной корочкой и кремовой текстурой внутри.',
  },
  {
    id: 'sinnabon',
    name: 'Синнабон',
    price: 350,
    category: 'pastry',
    images: [
      '/data/menu/СИННАБОН/image_1.png',
      '/data/menu/СИННАБОН/image_2.png',
      '/data/menu/СИННАБОН/image_3.png',
    ],
    description: 'Пышная булочка с корицей и сливочной глазурью — тёплая, ароматная, как дома.',
  },
  {
    id: 'vafli',
    name: 'Вафли',
    price: 380,
    category: 'pastry',
    images: [
      '/data/menu/ВАФЛИ/image_1.png',
      '/data/menu/ВАФЛИ/image_2.png',
      '/data/menu/ВАФЛИ/image_3.png',
    ],
    description: 'Хрустящие бельгийские вафли с топпингами на выбор — шоколад, ягоды, карамель.',
  },
  {
    id: 'crep-banan-chocolate',
    name: 'Креп с бананом и шоколадом',
    price: 360,
    category: 'crepe',
    images: [
      '/data/menu/КРЕП С БАНАНОМ И ШОКОЛАДОМ/image_1.png',
      '/data/menu/КРЕП С БАНАНОМ И ШОКОЛАДОМ/image_2.png',
    ],
    description: 'Нежный креп с кусочками банана и горячим шоколадным соусом.',
  },
  {
    id: 'crep-roll',
    name: 'Креп-Ролл',
    price: 380,
    category: 'crepe',
    images: [
      '/data/menu/КРЕП-РОЛЛ/image_1.png',
      '/data/menu/КРЕП-РОЛЛ/image_2.png',
      '/data/menu/КРЕП-РОЛЛ/image_3.png',
    ],
    description: 'Креп, свёрнутый рулетом с начинкой — удобно и стильно.',
  },
  {
    id: 'sushi-crep',
    name: 'Суши Креп',
    price: 400,
    category: 'crepe',
    images: [
      '/data/menu/СУШИ КРЕП/image_1.png',
      '/data/menu/СУШИ КРЕП/image_2.png',
    ],
    description: 'Авторский десерт — креп в форме суши с оригинальной подачей.',
  },
  {
    id: 'pancakes-chocolate',
    name: 'Панкейки с шоколадом',
    price: 370,
    category: 'pancake',
    images: [
      '/data/menu/ПАНКЕЙКИ С ШОКОЛАДОМ/image_1.png',
      '/data/menu/ПАНКЕЙКИ С ШОКОЛАДОМ/image_2.png',
      '/data/menu/ПАНКЕЙКИ С ШОКОЛАДОМ/image_3.png',
    ],
    description: 'Пышные панкейки с щедрой порцией шоколадного соуса и топпингами.',
  },
  {
    id: 'pancakes-berries',
    name: 'Панкейки с ягодами',
    price: 390,
    category: 'pancake',
    images: [
      '/data/menu/ПАНКЕЙКИ С ЯГОДАМИ/image_1.png',
      '/data/menu/ПАНКЕЙКИ С ЯГОДАМИ/image_2.png',
      '/data/menu/ПАНКЕЙКИ С ЯГОДАМИ/image_3.png',
    ],
    description: 'Воздушные панкейки со свежими сезонными ягодами и сливочным кремом.',
  },
  {
    id: 'burrata',
    name: 'Буррата',
    price: 520,
    category: 'specialty',
    images: [
      '/data/menu/БУРРАТА/image_1.png',
      '/data/menu/БУРРАТА/image_2.png',
    ],
    description: 'Нежная итальянская буррата с фруктами и мёдом — изысканный несладкий акцент.',
  },
  {
    id: 'finikoviy-desert',
    name: 'Финиковый десерт',
    price: 430,
    category: 'specialty',
    images: [
      '/data/menu/ФИНИКОВЫЙ ДЕСЕРТ/image_1.png',
      '/data/menu/ФИНИКОВЫЙ ДЕСЕРТ/image_2.png',
    ],
    description: 'Десерт на основе фиников с орехами и карамелью — натуральная сладость.',
  },
];
