/**
 * Verified against the venue's public listings and its own Taplink menu.
 * Address, phone and hours cross-checked on two independent directories.
 */
export const cafe = {
  name: 'ChocoDips',
  wordmark: { choco: 'CHOCO', dips: 'dips' },

  city: { ru: 'Нальчик', en: 'Nalchik' },
  region: { ru: 'Кабардино-Балкария', en: 'Kabardino-Balkaria' },
  street: { ru: 'ул. Пушкина, 87', en: '87 Pushkina St' },
  addressFull: {
    ru: 'Нальчик, ул. Пушкина, 87',
    en: 'Nalchik, 87 Pushkina St',
  },
  /** Interpolated from OSM house numbers 79 and 89 on Pushkina street. */
  coords: [43.4837, 43.6083] as [number, number],

  hours: {
    label: { ru: 'Ежедневно', en: 'Every day' },
    value: '10:00 — 23:00',
    open: 10,
    close: 23,
  },

  phone: {
    display: '+7 964 040-70-20',
    href: 'tel:+79640407020',
  },
  whatsapp: 'https://wa.me/79640407020',
  instagram: {
    href: 'https://www.instagram.com/chocodips.ru/',
    handle: '@chocodips.ru',
  },
  routeHref:
    'https://yandex.ru/maps/?text=%D0%9D%D0%B0%D0%BB%D1%8C%D1%87%D0%B8%D0%BA%2C%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%9F%D1%83%D1%88%D0%BA%D0%B8%D0%BD%D0%B0%2C%2087',

  logo: '/data/logo.png',
  logoMark: '/data/logo1.png',
  logoFooter: '/data/logo_footer.png',
  seal: '/data/chocodips.jpg',
} as const;

export const socials = [
  { id: 'instagram', label: 'Instagram', href: cafe.instagram.href },
  { id: 'whatsapp', label: 'WhatsApp', href: cafe.whatsapp },
  { id: 'phone', label: cafe.phone.display, href: cafe.phone.href },
] as const;

/** The three-line credo repeated as a ticker at section seams. */
export const ticker = {
  ru: [
    'бельгийский шоколад',
    'французские крепы',
    'ручная работа',
    'подаём тёплым',
    'нальчик · пушкина 87',
  ],
  en: [
    'belgian chocolate',
    'french crêpes',
    'made by hand',
    'served warm',
    'nalchik · 87 pushkina',
  ],
};
