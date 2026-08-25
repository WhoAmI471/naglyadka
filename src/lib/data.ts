import type { Aid, SoonSubject, Subject } from './types';

export const SUBJECTS: Subject[] = [
  {
    id: 'physics',
    mono: 'Ф',
    ru: {
      name: 'Физика',
      desc: 'Механика, колебания и оптика — с расчётом на каждом шаге.',
      topics: ['Механика', 'Колебания', 'Оптика', 'Электричество'],
    },
    en: {
      name: 'Physics',
      desc: 'Mechanics, oscillations and optics — with the maths in view.',
      topics: ['Mechanics', 'Oscillations', 'Optics', 'Electricity'],
    },
  },
  {
    id: 'chemistry',
    mono: 'Х',
    ru: {
      name: 'Химия',
      desc: 'Растворы, реакции и строение веществ — опыты без реактивов.',
      topics: ['Растворы', 'Кислоты и щёлочи', 'Атом'],
    },
    en: {
      name: 'Chemistry',
      desc: 'Solutions, reactions and structure — no reagents needed.',
      topics: ['Solutions', 'Acids & bases', 'The atom'],
    },
  },
  {
    id: 'astronomy',
    mono: 'А',
    ru: {
      name: 'Астрономия',
      desc: 'Фазы Луны, масштабы системы и наклон земной оси.',
      topics: ['Луна', 'Солнечная система', 'Земля'],
    },
    en: {
      name: 'Astronomy',
      desc: 'Moon phases, true scale of the system, axial tilt.',
      topics: ['Moon', 'Solar system', 'Earth'],
    },
  },
  {
    id: 'cs',
    mono: 'И',
    ru: {
      name: 'Информатика',
      desc: 'Алгоритмы и логика по шагам, а не на словах.',
      topics: ['Алгоритмы', 'Логика', 'Системы счисления'],
    },
    en: {
      name: 'Computer science',
      desc: 'Algorithms and logic step by step, not in words.',
      topics: ['Algorithms', 'Logic', 'Number systems'],
    },
  },
];

export const SOON: SoonSubject[] = [
  { mono: 'М', ru: 'Математика', en: 'Mathematics' },
  { mono: 'Б', ru: 'Биология', en: 'Biology' },
  { mono: 'Г', ru: 'География', en: 'Geography' },
];

export const AIDS: Aid[] = [
  {
    id: 'ballistics',
    s: 'physics',
    grade: 9,
    type: 'exp',
    sim: 'ballistics',
    ru: {
      title: 'Полёт ядра из ствола пушки',
      summary: 'Ставите угол и скорость вылета — считаем дальность, высоту и время полёта.',
      theory:
        'Ядро движется по параболе: по горизонтали равномерно, по вертикали — с ускорением свободного падения. Разложите начальную скорость на две составляющие, и задача распадается на два простых движения. Дальность максимальна при 45°, а углы 30° и 60° дают одинаковую дальность при разной высоте подъёма.',
    },
    en: {
      title: 'Cannonball trajectory',
      summary: 'Set the barrel angle and muzzle speed — get range, peak height and flight time.',
      theory:
        'The ball follows a parabola: uniform motion horizontally, free-fall acceleration vertically. Split the initial speed into two components and the problem becomes two simple motions. Range peaks at 45°, while 30° and 60° give the same range at different peak heights.',
    },
  },
  {
    id: 'pendulum',
    s: 'physics',
    grade: 9,
    type: 'model',
    sim: 'pendulum',
    ru: {
      title: 'Математический маятник',
      summary: 'Длина, амплитуда и сила тяжести — а период зависит только от двух из них.',
      theory:
        'Период малых колебаний зависит только от длины нити и ускорения свободного падения: ни масса груза, ни начальный угол (пока он мал) на него не влияют. Отсюда точность маятниковых часов — и то, что на Луне они шли бы почти в два с половиной раза медленнее.',
    },
    en: {
      title: 'Simple pendulum',
      summary: 'Length, amplitude and gravity — yet the period depends on only two of them.',
      theory:
        'The period of small oscillations depends only on the string length and gravity: neither the bob mass nor the starting angle (while small) matters. That is why pendulum clocks keep time — and why on the Moon they would run about 2.5× slower.',
    },
  },
  {
    id: 'titration',
    s: 'chemistry',
    grade: 9,
    type: 'exp',
    sim: 'titration',
    ru: {
      title: 'Титрование кислоты щёлочью',
      summary: 'Добавляете щёлочь по каплям — pH ползёт по кривой и в точке эквивалентности прыгает.',
      theory:
        'Пока кислота в избытке, pH меняется медленно. У точки эквивалентности количества кислоты и щёлочи сравниваются, и одна лишняя капля меняет pH на несколько единиц — отсюда резкий скачок кривой. Фенолфталеин розовеет как раз в этой области, поэтому и служит индикатором.',
    },
    en: {
      title: 'Acid–base titration',
      summary: 'Add base drop by drop — pH creeps along the curve, then jumps at the equivalence point.',
      theory:
        'While acid is in excess, pH barely moves. At the equivalence point the amounts match and one extra drop shifts pH by several units — hence the steep jump. Phenolphthalein turns pink exactly there, which is what makes it a useful indicator.',
    },
  },
  {
    id: 'lens',
    s: 'physics',
    grade: 8,
    type: 'model',
    sim: null,
    ru: {
      title: 'Собирающая линза и построение изображения',
      summary: 'Ход лучей, фокус и увеличение при разных расстояниях до предмета.',
    },
    en: {
      title: 'Converging lens and image construction',
      summary: 'Ray paths, focal point and magnification at different object distances.',
    },
  },
  {
    id: 'ohm',
    s: 'physics',
    grade: 8,
    type: 'graph',
    sim: null,
    ru: {
      title: 'Закон Ома для участка цепи',
      summary: 'Сопротивление и напряжение задаёте вы — ток идёт по расчёту.',
    },
    en: {
      title: 'Ohm’s law for a circuit section',
      summary: 'You set resistance and voltage — the current follows.',
    },
  },
  {
    id: 'atom',
    s: 'chemistry',
    grade: 8,
    type: 'model',
    sim: null,
    ru: {
      title: 'Строение атома и электронные оболочки',
      summary: 'Собираете атом по номеру элемента и смотрите, как заполняются уровни.',
    },
    en: {
      title: 'Atomic structure and electron shells',
      summary: 'Build an atom by element number and watch the shells fill.',
    },
  },
  {
    id: 'rate',
    s: 'chemistry',
    grade: 9,
    type: 'graph',
    sim: null,
    ru: {
      title: 'Скорость реакции и катализатор',
      summary: 'Температура, концентрация, катализатор — и время до конца реакции.',
    },
    en: {
      title: 'Reaction rate and catalysts',
      summary: 'Temperature, concentration, catalyst — and time to completion.',
    },
  },
  {
    id: 'moon',
    s: 'astronomy',
    grade: 11,
    type: 'model',
    sim: null,
    ru: {
      title: 'Фазы Луны',
      summary: 'Вид с Земли и вид сверху на систему Земля — Луна — Солнце.',
    },
    en: {
      title: 'Phases of the Moon',
      summary: 'The view from Earth alongside a top-down Earth–Moon–Sun view.',
    },
  },
  {
    id: 'seasons',
    s: 'astronomy',
    grade: 11,
    type: 'model',
    sim: null,
    ru: {
      title: 'Смена времён года',
      summary: 'Наклон оси, орбита и угол падения солнечных лучей.',
    },
    en: {
      title: 'Why we have seasons',
      summary: 'Axial tilt, orbit and the angle of incoming sunlight.',
    },
  },
  {
    id: 'solar',
    s: 'astronomy',
    grade: 11,
    type: 'model',
    sim: null,
    ru: {
      title: 'Масштаб Солнечной системы',
      summary: 'Настоящие расстояния и размеры планет в одном масштабе.',
    },
    en: {
      title: 'Scale of the Solar System',
      summary: 'Real distances and planet sizes in a single scale.',
    },
  },
  {
    id: 'sort',
    s: 'cs',
    grade: 9,
    type: 'algo',
    sim: null,
    ru: {
      title: 'Сортировка массива по шагам',
      summary: 'Пузырёк против быстрой сортировки: сравнения и обмены видно поштучно.',
    },
    en: {
      title: 'Array sorting, step by step',
      summary: 'Bubble vs quicksort: every comparison and swap made visible.',
    },
  },
  {
    id: 'gates',
    s: 'cs',
    grade: 8,
    type: 'model',
    sim: null,
    ru: {
      title: 'Логические вентили и таблица истинности',
      summary: 'Щёлкаете входами — схема и таблица отвечают.',
    },
    en: {
      title: 'Logic gates and truth tables',
      summary: 'Toggle the inputs — circuit and table respond.',
    },
  },
  {
    id: 'binary',
    s: 'cs',
    grade: 8,
    type: 'algo',
    sim: null,
    ru: {
      title: 'Перевод чисел в двоичную систему',
      summary: 'Деление с остатком в наглядном столбике разрядов.',
    },
    en: {
      title: 'Converting numbers to binary',
      summary: 'Division with remainder shown as a column of bits.',
    },
  },
];

export function getSubject(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

export function getAid(id: string): Aid | undefined {
  return AIDS.find((a) => a.id === id);
}

export function aidsOf(subjectId: string): Aid[] {
  return AIDS.filter((a) => a.s === subjectId);
}

export function countAids(subjectId: string): number {
  return aidsOf(subjectId).length;
}

export const LIVE_COUNT = AIDS.filter((a) => a.sim).length;
