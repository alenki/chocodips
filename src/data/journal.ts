import type { JournalEntry } from '../types';

const shot = (folder: string, n = 1) => encodeURI(`/data/menu/${folder}/image_${n}.png`);

export const journal: JournalEntry[] = [
  {
    id: 'the-pour',
    index: '01',
    kicker: { ru: 'Ритуал', en: 'The ritual' },
    title: { ru: 'Секунда, когда льётся шоколад', en: 'The second the chocolate falls' },
    body: [
      {
        ru: 'У каждого десерта здесь есть один кадр, ради которого он существует. Не тот, где он уже стоит на столе, — а тот, за полсекунды до: молочный шоколад висит в воздухе тонкой нитью, ещё не коснувшись тёплого блинчика.',
        en: 'Every dessert here has one frame it exists for. Not the one where it is already on the table — the one half a second before: milk chocolate suspended in a thin thread, not yet touching the warm crêpe.',
      },
      {
        ru: 'Поэтому мы почти никогда не поливаем на кухне. Шоколад приносят в стеклянном шоте, горячим, и льют при вас. Это не приём и не подача — это просто честнее.',
        en: 'Which is why we almost never pour in the kitchen. The chocolate arrives in a glass pitcher, hot, and goes over the dessert in front of you. It is not a trick and not plating — it is simply more honest.',
      },
    ],
    image: shot('БУРРАТА', 1),
    pull: {
      ru: 'Шоколад нельзя подать заранее. Он живёт минуту.',
      en: 'Chocolate cannot be served in advance. It lives for a minute.',
    },
  },
  {
    id: 'hot-and-cold',
    index: '02',
    kicker: { ru: 'Метод', en: 'Method' },
    title: { ru: 'Горячее рядом с холодным', en: 'Hot placed next to cold' },
    body: [
      {
        ru: 'Фондан выносят, когда центр ещё жидкий. Рядом — шарик ванильного мороженого, который начинает сдаваться сразу. Вафля тёплая, мороженое ледяное. Синнабон горячий, помадка холодная.',
        en: 'The fondant leaves the kitchen while its centre is still liquid. Beside it, a scoop of vanilla that starts surrendering immediately. The waffle is warm, the ice cream is frozen. The cinnamon bun is hot, its cream-cheese icing is cold.',
      },
      {
        ru: 'Это единственный приём, который мы повторяем в половине меню. Контраст температур делает сладкое не приторным: холод обрывает вкус ровно там, где он мог бы стать тяжёлым.',
        en: 'It is the one device we repeat across half the menu. A temperature contrast keeps sweetness from cloying: the cold cuts the flavour off exactly where it would have turned heavy.',
      },
    ],
    image: shot('ФОНДАН', 1),
  },
  {
    id: 'table-for-two',
    index: '03',
    kicker: { ru: 'Формат', en: 'Format' },
    title: { ru: 'Десерт, который нельзя съесть одному', en: 'The dessert you cannot finish alone' },
    body: [
      {
        ru: 'Фондю, профитроли Sable, большое блюдо Big Sable с шоколадным медальоном в центре — эти позиции мы намеренно сделали неудобными для одного человека.',
        en: 'Fondue, Sable profiteroles, the Big Sable platter with a stamped chocolate medallion at its centre — we deliberately made these awkward for one person.',
      },
      {
        ru: 'Когда в центре стола стоит одна тарелка на всех, разговор меняется. Люди перестают спешить, тянутся за одной и той же клубникой, спорят, кому достался последний профитроль. Мы за такие вечера.',
        en: 'When one plate sits in the middle of the table, the conversation changes. People stop hurrying, reach for the same strawberry, argue over the last profiterole. Those are the evenings we are here for.',
      },
    ],
    image: shot('ПРОФИТРОЛИ BIG SABLE', 1),
    pull: {
      ru: 'Одна тарелка на всех замедляет вечер лучше любого плейлиста.',
      en: 'One shared plate slows an evening down better than any playlist.',
    },
  },
  {
    id: 'pushkina-87',
    index: '04',
    kicker: { ru: 'Место', en: 'Place' },
    title: { ru: 'Пушкина, 87 — после шести', en: 'Pushkina 87, after six' },
    body: [
      {
        ru: 'Нальчик к вечеру становится тише, чем любой город его размера. Свет уходит за Кавказский хребет рано, и улица Пушкина минут на двадцать делается медовой.',
        en: 'Nalchik gets quieter in the evening than any city its size. The light drops behind the Caucasus range early, and for about twenty minutes Pushkina street turns the colour of honey.',
      },
      {
        ru: 'Мы работаем до одиннадцати именно из-за этих часов. Кофе, тёплый шоколад, окно — и город, который никуда не торопит.',
        en: 'We stay open until eleven precisely because of those hours. Coffee, warm chocolate, a window — and a city that is in no rush to move you along.',
      },
    ],
    image: shot('ФИСТАШКОВЫЙ КНАФЕ', 1),
  },
];

/** Loose photo essay shown between journal entries. */
export const essayShots: string[] = [
  shot('ЧОКО БУМ', 2),
  shot('КРЕП-РОЛЛ', 2),
  shot('СИННАБОН', 3),
  shot('ПАНКЕЙКИ С ЯГОДАМИ', 2),
  shot('СУШИ КРЕП', 1),
  shot('ВАФЛИ', 2),
  shot('ФОНДЮ', 1),
  shot('ЧИЗКЕЙК САН-САБАСТЬЯН', 1),
];
