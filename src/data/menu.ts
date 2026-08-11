import type { Bilingual, MenuCategory, MenuItem } from '../types';

/**
 * Image paths are percent-encoded at the data layer: folder names on disk are
 * Cyrillic and contain spaces, so raw values would be invalid URLs.
 */
const shots = (folder: string, count: number): string[] =>
  Array.from({ length: count }, (_, i) => encodeURI(`/data/menu/${folder}/image_${i + 1}.png`));

export const categories: MenuCategory[] = [
  {
    id: 'signature',
    index: 'I',
    title: { ru: 'Сигнатурные', en: 'Signature' },
    note: {
      ru: 'То, за чем возвращаются. Собираются слоями, подаются с шотом растопленного шоколада.',
      en: 'The reason people come back. Built in layers, served with a shot of melted chocolate.',
    },
  },
  {
    id: 'crepes',
    index: 'II',
    title: { ru: 'Крепы', en: 'Crêpes' },
    note: {
      ru: 'Французский блинчик — тонкий, тёплый, свёрнутый по-разному. Всегда под шоколадом.',
      en: 'The French pancake — thin, warm, folded a dozen ways. Always under chocolate.',
    },
  },
  {
    id: 'warm',
    index: 'III',
    title: { ru: 'Тёплое', en: 'Served warm' },
    note: {
      ru: 'Выносим из печи и сразу на стол. Эти десерты не ждут — и ждать не заставляют.',
      en: 'Out of the oven and straight to the table. These do not wait, and neither should you.',
    },
  },
  {
    id: 'pancakes',
    index: 'IV',
    title: { ru: 'Панкейки и чизкейк', en: 'Pancakes & cheesecake' },
    note: {
      ru: 'Утренняя половина меню, которая работает до самого закрытия.',
      en: 'The morning half of the menu — which happens to run until closing time.',
    },
  },
  {
    id: 'sharing',
    index: 'V',
    title: { ru: 'На компанию', en: 'To share' },
    note: {
      ru: 'Большие форматы. Ставятся в центр стола, и разговор сам собой замедляется.',
      en: 'Large formats. Set them in the middle of the table and the conversation slows down.',
    },
  },
];

const tag = (ru: string, en: string): Bilingual => ({ ru, en });

export const menu: MenuItem[] = [
  /* ------------------------------- I. SIGNATURE ------------------------------ */
  {
    id: 'choco-boom',
    index: '01',
    category: 'signature',
    price: 600,
    name: { ru: 'Чоко Бум', en: 'Choco Boom' },
    desc: {
      ru: 'Десерт из четырёх слоёв: плотное брауни на тёмном шоколаде, нежный пломбирный мусс, воздушный шоколадный бисквит и мороженое крем-брюле. Подаётся с молочным шоколадом.',
      en: 'Four layers: dense dark-chocolate brownie, soft ice-cream mousse, airy chocolate sponge and crème brûlée gelato. Served with milk chocolate.',
    },
    images: shots('ЧОКО БУМ', 3),
    tags: [tag('4 слоя', '4 layers')],
    featured: true,
  },
  {
    id: 'teddy',
    index: '02',
    category: 'signature',
    price: 450,
    name: { ru: 'Тедди', en: 'Teddy' },
    desc: {
      ru: 'Муссовый десерт на основе бельгийского карамелизированного шоколада, с начинкой из нежнейшей солёной карамели и шоколадного бисквита. Подаётся с шотом молочного шоколада.',
      en: 'A mousse dessert built on caramelised Belgian chocolate, filled with silky salted caramel and chocolate sponge. Served with a shot of milk chocolate.',
    },
    images: [],
    tags: [tag('мусс', 'mousse')],
  },
  {
    id: 'chocomisu',
    index: '03',
    category: 'signature',
    price: 450,
    name: { ru: 'Чокомису', en: 'Chocomisu' },
    desc: {
      ru: 'Неклассический тирамису в стиле ChocoDips. Фирменный крем, печенье савоярди, кофе и, конечно же, молочный шоколад.',
      en: 'Tiramisù the ChocoDips way. House cream, savoiardi, coffee and — inevitably — milk chocolate.',
    },
    images: [],
    tags: [tag('с кофе', 'with coffee')],
  },
  {
    id: 'pistachio-knafeh',
    index: '04',
    category: 'signature',
    price: 700,
    name: { ru: 'Фисташковый кнафе', en: 'Pistachio knafeh' },
    desc: {
      ru: 'Чизкейк в сфере из теста катаифи с фисташковой пастой, политый миксом из белого и молочного шоколада.',
      en: 'A cheesecake sphere wrapped in kataifi pastry with pistachio paste, poured over with white and milk chocolate.',
    },
    images: shots('ФИСТАШКОВЫЙ КНАФЕ', 1),
    tags: [tag('катаифи', 'kataifi')],
    featured: true,
  },

  /* -------------------------------- II. CRÊPES ------------------------------- */
  {
    id: 'brownie-crepe',
    index: '05',
    category: 'crepes',
    price: 410,
    name: { ru: 'Брауни-креп', en: 'Brownie crêpe' },
    desc: {
      ru: 'Французский блинчик с начинкой из брауни на основе тёмного шоколада, подаётся с миксом из молочного, тёмного и белого шоколада.',
      en: 'A French crêpe filled with dark-chocolate brownie, served with a mix of milk, dark and white chocolate.',
    },
    images: shots('БРАУНИ-КРЕП', 3),
  },
  {
    id: 'crepe-roll',
    index: '06',
    category: 'crepes',
    price: 450,
    name: { ru: 'Креп-ролл', en: 'Crêpe roll' },
    desc: {
      ru: 'Ролл из французского блинчика с начинкой из сливочного крема, брауни на основе тёмного шоколада, маленьких профитролей и клубники. Подаётся с миксом из молочного, тёмного и белого шоколада.',
      en: 'A rolled French crêpe filled with cream, dark-chocolate brownie, miniature profiteroles and strawberry. Served with milk, dark and white chocolate.',
    },
    images: shots('КРЕП-РОЛЛ', 3),
    featured: true,
  },
  {
    id: 'crepe-banana',
    index: '07',
    category: 'crepes',
    price: 410,
    name: { ru: 'Креп с бананом и шоколадом', en: 'Banana & chocolate crêpe' },
    desc: {
      ru: 'Французский блинчик с начинкой из банана, политый миксом из молочного и тёмного шоколада, подаётся с крошкой из медового печенья.',
      en: 'A French crêpe filled with banana, poured over with milk and dark chocolate, finished with honey-biscuit crumb.',
    },
    images: shots('КРЕП С БАНАНОМ И ШОКОЛАДОМ', 2),
  },
  {
    id: 'sushi-crepe',
    index: '08',
    category: 'crepes',
    price: 435,
    name: { ru: 'Суши-креп', en: 'Sushi crêpe' },
    desc: {
      ru: 'Суши из французского блинчика со сливочным кремом и банановой начинкой, подаются с молочным шоколадом и сезонными ягодами.',
      en: 'Crêpe "sushi" with cream and banana filling, served with milk chocolate and seasonal berries.',
    },
    images: shots('СУШИ КРЕП', 2),
    tags: [tag('8 штук', '8 pieces')],
  },
  {
    id: 'burrata',
    index: '09',
    category: 'crepes',
    price: 410,
    name: { ru: 'Буррата', en: 'Burrata' },
    desc: {
      ru: 'Французский блинчик с начинкой из крема на основе греческого йогурта и клубники, подаётся с молочным шоколадом.',
      en: 'A French crêpe folded around Greek-yoghurt cream and strawberry, served with milk chocolate.',
    },
    images: shots('БУРРАТА', 2),
  },

  /* --------------------------------- III. WARM ------------------------------- */
  {
    id: 'fondant',
    index: '10',
    category: 'warm',
    price: 420,
    name: { ru: 'Фондан', en: 'Fondant' },
    desc: {
      ru: 'Горячий фондан на основе тёмного шоколада, украшенный миксом из молочного, тёмного и белого шоколада, подаётся с шариком ванильного мороженого.',
      en: 'A hot dark-chocolate fondant finished with milk, dark and white chocolate, served with a scoop of vanilla ice cream.',
    },
    images: shots('ФОНДАН', 1),
    tags: [tag('горячий', 'served hot')],
    featured: true,
  },
  {
    id: 'cinnabon',
    index: '11',
    category: 'warm',
    price: 340,
    name: { ru: 'Синнабон', en: 'Cinnabon' },
    desc: {
      ru: 'Тёплая булочка из сдобного теста с корицей, подаётся со сливочной помадкой, тёплой солёной карамелью и крошкой карамелизированного пекана.',
      en: 'A warm cinnamon bun with cream-cheese fondant, warm salted caramel and caramelised pecan crumb.',
    },
    images: shots('СИННАБОН', 3),
    tags: [tag('тёплый', 'served warm')],
    featured: true,
  },
  {
    id: 'waffle',
    index: '12',
    category: 'warm',
    price: 410,
    name: { ru: 'Вафли', en: 'Waffle' },
    desc: {
      ru: 'Тёплая венская вафля, политая миксом из молочного, белого и тёмного шоколада, подаётся с шариком ванильного мороженого. По желанию — клубника или банан.',
      en: 'A warm Viennese waffle under milk, white and dark chocolate, served with vanilla ice cream. Add strawberry or banana if you like.',
    },
    images: shots('ВАФЛИ', 3),
    tags: [tag('тёплая', 'served warm')],
  },
  {
    id: 'date-dessert',
    index: '13',
    category: 'warm',
    price: 390,
    name: { ru: 'Финиковый десерт', en: 'Date dessert' },
    desc: {
      ru: 'Кусочки финикового бисквита, политые тёплой солёной карамелью, подаются с шариком ванильного мороженого и крошкой из карамелизированного пекана.',
      en: 'Date sponge under warm salted caramel, served with vanilla ice cream and caramelised pecan crumb.',
    },
    images: shots('ФИНИКОВЫЙ ДЕСЕРТ', 2),
    tags: [tag('с мороженым', 'with ice cream')],
  },

  /* ------------------------ IV. PANCAKES & CHEESECAKE ----------------------- */
  {
    id: 'pancakes-chocolate',
    index: '14',
    category: 'pancakes',
    price: 420,
    name: { ru: 'Панкейки с шоколадом', en: 'Chocolate pancakes' },
    desc: {
      ru: 'Американские панкейки, подаются с кремом на основе творожного сыра, крошкой медового печенья и миксом из молочного, белого и тёмного шоколада.',
      en: 'American pancakes with cream-cheese frosting, honey-biscuit crumb and a mix of milk, white and dark chocolate.',
    },
    images: shots('ПАНКЕЙКИ С ШОКОЛАДОМ', 3),
  },
  {
    id: 'pancakes-berries',
    index: '15',
    category: 'pancakes',
    price: 410,
    name: { ru: 'Панкейки с ягодами', en: 'Berry pancakes' },
    desc: {
      ru: 'Американские панкейки с прослойкой из крема на основе греческого йогурта, солёной карамелью и сезонными ягодами.',
      en: 'American pancakes layered with Greek-yoghurt cream, salted caramel and seasonal berries.',
    },
    images: shots('ПАНКЕЙКИ С ЯГОДАМИ', 3),
  },
  {
    id: 'cheesecake-basque',
    index: '16',
    category: 'pancakes',
    price: 390,
    name: { ru: 'Чизкейк Сан-Себастьян', en: 'San Sebastián cheesecake' },
    desc: {
      ru: 'Классическая версия баскского чизкейка, подаётся с молочным шоколадом.',
      en: 'The classic Basque burnt cheesecake, served with milk chocolate.',
    },
    images: shots('ЧИЗКЕЙК САН-САБАСТЬЯН', 2),
    tags: [tag('баскский', 'basque')],
  },

  /* -------------------------------- V. SHARING ------------------------------ */
  {
    id: 'profiteroles-sable',
    index: '17',
    category: 'sharing',
    price: 750,
    name: { ru: 'Профитроли Sable', en: 'Sable profiteroles' },
    desc: {
      ru: 'Воздушные профитроли, наполненные фирменным кремом Sable, подаются с миксом из молочного и белого шоколада. Десерт подойдёт на компанию из двух человек.',
      en: 'Airy profiteroles filled with our Sable cream, served with milk and white chocolate. Made for two.',
    },
    images: shots('ПРОФИТРОЛИ SABLE', 2),
    tags: [tag('на двоих', 'for two')],
  },
  {
    id: 'profiteroles-big-sable',
    index: '18',
    category: 'sharing',
    price: 2500,
    name: { ru: 'Профитроли Big Sable', en: 'Big Sable profiteroles' },
    desc: {
      ru: 'Профитроли с фирменным кремом, смесь молочного и белого шоколада. Большое блюдо с шоколадным медальоном ChocoDips в центре.',
      en: 'A full platter of profiteroles with our house cream, milk and white chocolate, and a stamped ChocoDips medallion at the centre.',
    },
    images: shots('ПРОФИТРОЛИ BIG SABLE', 2),
    tags: [tag('на компанию', 'for a party')],
  },
  {
    id: 'fondue',
    index: '19',
    category: 'sharing',
    price: 850,
    name: { ru: 'Фондю', en: 'Fondue' },
    desc: {
      ru: 'Бананы, клубника, брауни на основе тёмного шоколада, профитроли с фирменным кремом — в сочетании с бельгийским молочным шоколадом.',
      en: 'Banana, strawberry, dark-chocolate brownie and cream-filled profiteroles — with a pot of Belgian milk chocolate.',
    },
    images: shots('ФОНДЮ', 1),
    tags: [tag('на компанию', 'for a party')],
    featured: true,
  },
];

export const featured: MenuItem[] = menu.filter((item) => item.featured);

export const menuByCategory = categories.map((category) => ({
  category,
  items: menu.filter((item) => item.category === category.id),
}));

export const priceRange = {
  min: Math.min(...menu.map((i) => i.price)),
  max: Math.max(...menu.map((i) => i.price)),
};

export const itemCount = menu.length;

/** Every photograph in the menu, for gallery strips and marquees. */
export const allShots: { src: string; item: MenuItem }[] = menu.flatMap((item) =>
  item.images.map((src) => ({ src, item })),
);
