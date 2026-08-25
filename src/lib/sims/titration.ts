import { fmt, lbl } from '../format';
import type { Sim } from '../types';

/** pH of 25 mL of HCl (ca) after adding vb mL of NaOH (cb). */
export function ph(ca: number, cb: number, vb: number): number {
  const va = 25;
  const na = (ca * va) / 1000;
  const nb = (cb * vb) / 1000;
  const v = (va + vb) / 1000;
  if (Math.abs(na - nb) < 1e-9) return 7;
  if (na > nb) return Math.max(0.3, -Math.log10((na - nb) / v));
  return Math.min(13.7, 14 + Math.log10((nb - na) / v));
}

export const titration: Sim = {
  defaults: { ca: 0.1, cb: 0.1, vb: 12 },

  controls: [
    { key: 'ca', ru: 'Концентрация HCl', en: 'HCl concentration', min: 0.02, max: 0.5, step: 0.01, unit: 'моль/л', unitEn: 'mol/L', d: 2 },
    { key: 'cb', ru: 'Концентрация NaOH', en: 'NaOH concentration', min: 0.02, max: 0.5, step: 0.01, unit: 'моль/л', unitEn: 'mol/L', d: 2 },
    { key: 'vb', ru: 'Добавлено NaOH', en: 'NaOH added', min: 0, max: 50, step: 0.2, unit: 'мл', unitEn: 'mL', d: 1 },
  ],

  legend: [
    { ru: 'кривая титрования', en: 'titration curve', c: 'var(--primary)' },
    { ru: 'текущая точка', en: 'current point', c: 'var(--amber)' },
    { ru: 'точка эквивалентности', en: 'equivalence point', c: 'var(--violet)' },
  ],

  readouts(p, ru) {
    const veq = (p.ca * 25) / p.cb;
    const cur = ph(p.ca, p.cb, p.vb);
    return [
      { label: 'pH', value: fmt(cur, 2), unit: '' },
      { label: ru ? 'Точка эквивалентности' : 'Equivalence point', value: fmt(veq, 1), unit: ru ? 'мл' : 'mL' },
      { label: ru ? 'Осталось до неё' : 'Left to add', value: fmt(Math.max(0, veq - p.vb), 1), unit: ru ? 'мл' : 'mL' },
      {
        label: ru ? 'Среда' : 'Medium',
        value:
          cur < 6.5
            ? ru ? 'кислая' : 'acidic'
            : cur > 7.5
              ? ru ? 'щелочная' : 'basic'
              : ru ? 'нейтральная' : 'neutral',
        unit: '',
      },
      {
        label: ru ? 'Индикатор' : 'Indicator',
        value: cur > 8.6 ? (ru ? 'розовый' : 'pink') : ru ? 'бесцветный' : 'colourless',
        unit: '',
      },
    ];
  },

  formulas(p, ru) {
    const veq = (p.ca * 25) / p.cb;
    const cur = ph(p.ca, p.cb, p.vb);
    return [
      {
        expr: 'n = C · V',
        sub: fmt(p.ca, 2) + ' · 0,025 = ' + fmt(p.ca * 0.025, 5) + (ru ? ' моль кислоты' : ' mol of acid'),
        note: ru ? 'количество вещества в пробе' : 'amount of substance in the sample',
      },
      {
        expr: 'V(экв) = C(к)·V(к) / C(щ)',
        sub: fmt(p.ca, 2) + ' · 25 / ' + fmt(p.cb, 2) + ' = ' + fmt(veq, 1) + (ru ? ' мл' : ' mL'),
        note: ru ? 'объём щёлочи в точке эквивалентности' : 'base volume at equivalence',
      },
      {
        expr: 'pH = −lg[H⁺]',
        sub: (ru ? 'при V = ' : 'at V = ') + fmt(p.vb, 1) + (ru ? ' мл → pH = ' : ' mL → pH = ') + fmt(cur, 2),
        note: ru ? 'текущая кислотность раствора' : 'current acidity of the solution',
      },
    ];
  },

  draw(ctx, w, h, p, time, T2) {
    // The burette only earns its space on a wide canvas; below that the graph
    // takes the full width instead of being squeezed into nothing.
    const withBurette = w >= 560 && h >= 320;
    const gx = withBurette ? 176 : 40;
    const gy = 34;
    const gw = w - gx - 36;
    const gh = h - gy - 54;
    const X = (v: number) => gx + (v / 50) * gw;
    const Y = (val: number) => gy + gh - (val / 14) * gh;

    for (let i = 0; i <= 14; i += 2) {
      const y = Y(i);
      ctx.strokeStyle = T2.grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(gx, y);
      ctx.lineTo(gx + gw, y);
      ctx.stroke();
      lbl(ctx, String(i), gx - 8, y + 4, T2.dim, 10.5, 'right');
    }
    for (let v = 0; v <= 50; v += 10) lbl(ctx, String(v), X(v), gy + gh + 18, T2.dim, 10.5, 'center');

    ctx.strokeStyle = T2.line;
    ctx.beginPath();
    ctx.moveTo(gx, gy + gh);
    ctx.lineTo(gx + gw, gy + gh);
    ctx.stroke();

    const veq = (p.ca * 25) / p.cb;
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = T2.violet;
    ctx.beginPath();
    ctx.moveTo(X(veq), gy);
    ctx.lineTo(X(veq), gy + gh);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = T2.primary;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 400; i++) {
      const v = (i / 400) * 50;
      const x = X(v);
      const y = Y(ph(p.ca, p.cb, v));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    const cur = ph(p.ca, p.cb, p.vb);
    ctx.fillStyle = T2.amber;
    ctx.shadowColor = T2.amberGlow;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(X(p.vb), Y(cur), 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    lbl(ctx, 'pH ' + fmt(cur, 2), X(p.vb) + 10, Y(cur) - 8, T2.amber, 12);
    lbl(ctx, 'V(экв) ' + fmt(veq, 1), X(veq) + 8, gy + 14, T2.violet, 11.5);
    lbl(ctx, 'pH', gx - 8, gy - 6, T2.dim, 10.5, 'right');

    if (!withBurette) return;

    const bx = 48;
    const bw = 84;
    const bh = 152;
    const by = h - 68;
    ctx.strokeStyle = T2.solid;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx, by - bh);
    ctx.lineTo(bx, by);
    ctx.lineTo(bx + bw, by);
    ctx.lineTo(bx + bw, by - bh);
    ctx.stroke();

    const fill = Math.min(bh - 14, 60 + p.vb * 1.4);
    const pink = cur > 8.6 ? Math.min(1, (cur - 8.6) / 1.6) : 0;
    ctx.fillStyle = pink > 0 ? 'rgba(236,72,153,' + (0.18 + pink * 0.5) + ')' : T2.liquid;
    ctx.fillRect(bx + 2, by - fill, bw - 4, fill - 2);

    ctx.fillStyle = T2.faintSolid;
    ctx.fillRect(bx + bw / 2 - 3, by - bh - 48, 6, 42);

    const dy = (time * 150) % 48;
    ctx.fillStyle = T2.amber;
    ctx.beginPath();
    ctx.arc(bx + bw / 2, by - bh - 6 + dy, 3.2, 0, Math.PI * 2);
    ctx.fill();

    lbl(ctx, 'HCl 25', bx, by + 20, T2.muted, 11.5);
    lbl(ctx, 'NaOH', bx + bw / 2, by - bh - 56, T2.muted, 11.5, 'center');
  },
};
