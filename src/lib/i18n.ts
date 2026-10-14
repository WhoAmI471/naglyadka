import type { Lang, AidType } from './types';

export interface Dict {
  brand: string;
  brandSub: string;
  catalog: string;
  soon: string;
  theme: string;
  lang: string;
  dark: string;
  light: string;
  type: string;
  params: string;
  result: string;
  formulas: string;
  how: string;
  backAll: string;
  all: string;
  aids: string;
  interactive: string;
  open: string;
  soonBadge: string;
  liveBadge: string;
  pause: string;
  play: string;
  reset: string;
  share: string;
  shared: string;
  empty: string;
  stub: string;
  eyebrow: string;
  title: string;
  sub: string;
  subjects: string;
  grade: string;
  preview: string;
  /** Frame counter, e.g. «Кадр 2 из 4»; {i} and {n} are substituted. */
  frameOf: string;
  menu: string;
  closeMenu: string;
  allOfSubject: string;
}

export const L: Record<Lang, Dict> = {
  ru: {
    brand: 'Наглядка',
    brandSub: 'каталог пособий',
    catalog: 'Каталог',
    soon: 'Скоро',
    theme: 'Тема',
    lang: 'Язык',
    dark: 'Тёмная',
    light: 'Светлая',
    type: 'Тип',
    params: 'Параметры',
    result: 'Расчёт',
    formulas: 'Формулы',
    how: 'Как это работает',
    backAll: '← Все предметы',
    all: 'Все',
    aids: 'пособий',
    interactive: 'интерактивных',
    open: 'Открыть пособие →',
    soonBadge: 'скоро',
    liveBadge: 'интерактив',
    pause: 'Пауза',
    play: 'Запустить',
    reset: 'Сбросить',
    share: 'Поделиться',
    shared: 'Ссылка с текущими параметрами скопирована',
    empty: 'Под этот фильтр пособий нет — выберите другой тип.',
    stub: 'Пособие в разработке: сцена и параметры появятся в следующем обновлении каталога. Готовые интерактивы отмечены в списке значком «интерактив».',
    eyebrow: 'Каталог наглядных пособий',
    title: 'Школьная программа, которую можно потрогать.',
    sub: 'Выберите предмет — внутри опыты, модели и графики. У каждого пособия свои параметры: двигаете ползунки и сразу видите, что происходит с расчётом.',
    subjects: 'предмета',
    grade: 'класс',
    preview: 'Смотреть',
    frameOf: 'Кадр {i} из {n}',
    menu: 'Меню',
    closeMenu: 'Закрыть меню',
    allOfSubject: 'Все пособия',
  },
  en: {
    brand: 'Naglyadka',
    brandSub: 'visual aids catalog',
    catalog: 'Catalog',
    soon: 'Coming soon',
    theme: 'Theme',
    lang: 'Language',
    dark: 'Dark',
    light: 'Light',
    type: 'Type',
    params: 'Parameters',
    result: 'Live values',
    formulas: 'Formulas',
    how: 'How it works',
    backAll: '← All subjects',
    all: 'All',
    aids: 'aids',
    interactive: 'interactive',
    open: 'Open aid →',
    soonBadge: 'soon',
    liveBadge: 'interactive',
    pause: 'Pause',
    play: 'Play',
    reset: 'Reset',
    share: 'Share',
    shared: 'Link with current parameters copied',
    empty: 'No aids for this filter — pick another type.',
    stub: 'This aid is in progress: the scene and its parameters land in the next catalog update. Ready ones are marked "interactive".',
    eyebrow: 'Catalog of visual aids',
    title: 'The school curriculum you can actually touch.',
    sub: 'Pick a subject — experiments, models and graphs inside. Every aid has its own parameters: move a slider and watch the numbers respond.',
    subjects: 'subjects',
    grade: 'grade',
    preview: 'Preview',
    frameOf: 'Frame {i} of {n}',
    menu: 'Menu',
    closeMenu: 'Close menu',
    allOfSubject: 'All aids',
  },
};

export const TYPES: Record<AidType, Record<Lang, string>> = {
  exp: { ru: 'Опыт', en: 'Experiment' },
  model: { ru: 'Модель', en: 'Model' },
  graph: { ru: 'График', en: 'Graph' },
  algo: { ru: 'Алгоритм', en: 'Algorithm' },
};

/** Fill a frame counter template. */
export function frameLabel(t: Dict, i: number, n: number): string {
  return t.frameOf.replace('{i}', String(i)).replace('{n}', String(n));
}
