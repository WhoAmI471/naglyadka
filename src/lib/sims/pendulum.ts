import { fmt, lbl } from '../format';
import type { Sim } from '../types';

export const pendulum: Sim = {
  defaults: { Ln: 1.2, a0: 24, g: 9.8 },

  controls: [
    { key: 'Ln', ru: 'Длина нити L', en: 'String length L', min: 0.2, max: 3, step: 0.05, unit: 'м', unitEn: 'm', d: 2 },
    { key: 'a0', ru: 'Начальный угол α₀', en: 'Start angle α₀', min: 4, max: 60, step: 1, unit: '°', unitEn: '°', d: 0 },
    { key: 'g', ru: 'Ускорение g', en: 'Gravity g', min: 1.6, max: 24.8, step: 0.1, unit: 'м/с²', unitEn: 'm/s²', d: 1 },
  ],

  legend: [
    { ru: 'нить и груз', en: 'string and bob', c: 'var(--amber)' },
    { ru: 'дуга траектории', en: 'swing arc', c: 'var(--primary)' },
    { ru: 'вертикаль', en: 'vertical', c: 'var(--dim)' },
  ],

  readouts(p, ru) {
    const T = 2 * Math.PI * Math.sqrt(p.Ln / p.g);
    const rad = (p.a0 * Math.PI) / 180;
    return [
      { label: ru ? 'Период T' : 'Period T', value: fmt(T, 3), unit: ru ? 'с' : 's' },
      { label: ru ? 'Частота ν' : 'Frequency ν', value: fmt(1 / T, 3), unit: ru ? 'Гц' : 'Hz' },
      {
        label: ru ? 'Наибольшая скорость' : 'Max speed',
        value: fmt(Math.sqrt(2 * p.g * p.Ln * (1 - Math.cos(rad))), 2),
        unit: ru ? 'м/с' : 'm/s',
      },
      { label: ru ? 'Подъём груза' : 'Bob rise', value: fmt(p.Ln * (1 - Math.cos(rad)) * 100, 1), unit: ru ? 'см' : 'cm' },
    ];
  },

  formulas(p, ru) {
    const T = 2 * Math.PI * Math.sqrt(p.Ln / p.g);
    const rad = (p.a0 * Math.PI) / 180;
    return [
      {
        expr: 'T = 2π √(L / g)',
        sub: '2π · √(' + fmt(p.Ln, 2) + ' / ' + fmt(p.g, 1) + ') = ' + fmt(T, 3) + (ru ? ' с' : ' s'),
        note: ru ? 'период малых колебаний' : 'period of small oscillations',
      },
      {
        expr: 'ν = 1 / T',
        sub: '1 / ' + fmt(T, 3) + ' = ' + fmt(1 / T, 3) + (ru ? ' Гц' : ' Hz'),
        note: ru ? 'частота колебаний' : 'frequency',
      },
      {
        expr: 'v(max) = √(2gL(1 − cos α₀))',
        sub:
          '√(2 · ' + fmt(p.g, 1) + ' · ' + fmt(p.Ln, 2) + ' · ' + fmt(1 - Math.cos(rad), 4) + ') = ' +
          fmt(Math.sqrt(2 * p.g * p.Ln * (1 - Math.cos(rad))), 2) + (ru ? ' м/с' : ' m/s'),
        note: ru ? 'скорость в нижней точке' : 'speed at the lowest point',
      },
    ];
  },

  draw(ctx, w, h, p, time, T2) {
    const T = 2 * Math.PI * Math.sqrt(p.Ln / p.g);
    const a0 = (p.a0 * Math.PI) / 180;
    const ang = a0 * Math.cos((2 * Math.PI * time) / T);
    const px = w / 2;
    const py = 56;
    const k = (h - 140) / 3;
    // Keep the bob inside the canvas however short it gets.
    const Lp = Math.max(40, Math.min(p.Ln * k, h - py - 44));
    const bx = px + Math.sin(ang) * Lp;
    const by = py + Math.cos(ang) * Lp;

    ctx.fillStyle = T2.solid;
    ctx.beginPath();
    ctx.roundRect(px - 48, py - 14, 96, 12, 4);
    ctx.fill();

    ctx.setLineDash([3, 5]);
    ctx.strokeStyle = T2.faint;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px, py + Lp + 28);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = T2.primary;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(px, py, Lp, Math.PI / 2 - a0, Math.PI / 2 + a0);
    ctx.stroke();

    ctx.strokeStyle = T2.faint;
    ctx.beginPath();
    ctx.arc(px, py, Math.min(48, Lp - 8), Math.PI / 2 - a0, Math.PI / 2 + a0);
    ctx.stroke();

    ctx.strokeStyle = T2.amber;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(bx, by);
    ctx.stroke();

    ctx.fillStyle = T2.amber;
    ctx.shadowColor = T2.amberGlow;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(bx, by, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    lbl(ctx, 'L = ' + fmt(p.Ln, 2), px + 12, py + Lp / 2, T2.muted, 12);
    lbl(ctx, 'α = ' + fmt((ang * 180) / Math.PI, 1) + '°', px + 56, py + 32, T2.text, 12);
    lbl(ctx, 'T = ' + fmt(T, 3), 24, 28, T2.muted, 12);
  },
};
