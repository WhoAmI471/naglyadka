import { fmt, lbl } from '../format';
import type { Sim } from '../types';

export const ballistics: Sim = {
  defaults: { v0: 45, ang: 45, g: 9.8 },

  controls: [
    { key: 'v0', ru: 'Начальная скорость v₀', en: 'Muzzle speed v₀', min: 10, max: 90, step: 1, unit: 'м/с', unitEn: 'm/s', d: 0 },
    { key: 'ang', ru: 'Угол наклона ствола α', en: 'Barrel angle α', min: 5, max: 85, step: 1, unit: '°', unitEn: '°', d: 0 },
    { key: 'g', ru: 'Ускорение свободного падения g', en: 'Gravity g', min: 1.6, max: 24.8, step: 0.1, unit: 'м/с²', unitEn: 'm/s²', d: 1 },
  ],

  legend: [
    { ru: 'траектория', en: 'trajectory', c: 'var(--primary)' },
    { ru: 'ядро', en: 'cannonball', c: 'var(--amber)' },
    { ru: 'вектор скорости', en: 'velocity vector', c: 'var(--violet)' },
  ],

  readouts(p, ru) {
    const a = (p.ang * Math.PI) / 180;
    const vy = p.v0 * Math.sin(a);
    const vx = p.v0 * Math.cos(a);
    return [
      { label: ru ? 'Дальность R' : 'Range R', value: fmt((p.v0 * p.v0 * Math.sin(2 * a)) / p.g, 1), unit: ru ? 'м' : 'm' },
      { label: ru ? 'Высота H' : 'Peak height H', value: fmt((vy * vy) / (2 * p.g), 1), unit: ru ? 'м' : 'm' },
      { label: ru ? 'Время полёта T' : 'Flight time T', value: fmt((2 * vy) / p.g, 2), unit: ru ? 'с' : 's' },
      { label: ru ? 'Скорость по x' : 'Speed along x', value: fmt(vx, 1), unit: ru ? 'м/с' : 'm/s' },
      { label: ru ? 'Скорость по y' : 'Speed along y', value: fmt(vy, 1), unit: ru ? 'м/с' : 'm/s' },
    ];
  },

  formulas(p, ru) {
    const a = (p.ang * Math.PI) / 180;
    const vy = p.v0 * Math.sin(a);
    return [
      {
        expr: 'R = v₀² · sin 2α / g',
        sub:
          fmt(p.v0, 0) + '² · sin ' + fmt(2 * p.ang, 0) + '° / ' + fmt(p.g, 1) + ' = ' +
          fmt((p.v0 * p.v0 * Math.sin(2 * a)) / p.g, 1) + (ru ? ' м' : ' m'),
        note: ru ? 'дальность полёта' : 'range',
      },
      {
        expr: 'H = (v₀ sin α)² / 2g',
        sub:
          '(' + fmt(p.v0, 0) + ' · ' + fmt(Math.sin(a), 3) + ')² / (2 · ' + fmt(p.g, 1) + ') = ' +
          fmt((vy * vy) / (2 * p.g), 1) + (ru ? ' м' : ' m'),
        note: ru ? 'наибольшая высота' : 'peak height',
      },
      {
        expr: 'T = 2 v₀ sin α / g',
        sub:
          '2 · ' + fmt(p.v0, 0) + ' · ' + fmt(Math.sin(a), 3) + ' / ' + fmt(p.g, 1) + ' = ' +
          fmt((2 * vy) / p.g, 2) + (ru ? ' с' : ' s'),
        note: ru ? 'время полёта' : 'flight time',
      },
    ];
  },

  draw(ctx, w, h, p, time, T2) {
    const a = (p.ang * Math.PI) / 180;
    const vx = p.v0 * Math.cos(a);
    const vy = p.v0 * Math.sin(a);
    const T = (2 * vy) / p.g;
    const R = vx * T;
    const H = (vy * vy) / (2 * p.g);
    const ox = 64;
    const oy = h - 48;
    const k = Math.min((w - ox - 54) / Math.max(R, 1), (oy - 46) / Math.max(H * 1.15, 1));
    const X = (x: number) => ox + x * k;
    const Y = (y: number) => oy - y * k;

    ctx.strokeStyle = T2.line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(24, oy);
    ctx.lineTo(w - 16, oy);
    ctx.stroke();

    for (let i = 1; i <= 5; i++) {
      const gx = X((R * i) / 5);
      ctx.strokeStyle = T2.grid;
      ctx.beginPath();
      ctx.moveTo(gx, oy);
      ctx.lineTo(gx, 42);
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(ox, oy);
    ctx.rotate(-a);
    ctx.fillStyle = T2.solid;
    ctx.beginPath();
    ctx.roundRect(0, -7, 46, 14, 4);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = T2.solid;
    ctx.beginPath();
    ctx.arc(ox, oy, 14, Math.PI, 0);
    ctx.fill();

    ctx.setLineDash([4, 5]);
    ctx.strokeStyle = T2.primary;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    for (let i = 0; i <= 90; i++) {
      const t = (T * i) / 90;
      const x = X(vx * t);
      const y = Y(vy * t - (p.g * t * t) / 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    const apex = X(R / 2);
    ctx.strokeStyle = T2.faint;
    ctx.beginPath();
    ctx.moveTo(apex, Y(H));
    ctx.lineTo(apex, oy);
    ctx.stroke();
    lbl(ctx, 'H = ' + fmt(H, 1), apex + 8, Y(H) + 14, T2.muted, 11.5);
    lbl(ctx, 'R = ' + fmt(R, 1), X(R) - 4, oy + 20, T2.muted, 11.5, 'right');

    const tt = time % (T + 0.7);
    const t = Math.min(tt, T);
    const px = X(vx * t);
    const py = Y(vy * t - (p.g * t * t) / 2);
    const cy = vy - p.g * t;
    const sc = Math.min(1, 46 / Math.max(p.v0, 1));

    ctx.strokeStyle = T2.violet;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px + vx * sc, py - cy * sc);
    ctx.stroke();

    ctx.fillStyle = T2.amber;
    ctx.shadowColor = T2.amberGlow;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(px, py, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    lbl(ctx, 'v = ' + fmt(Math.sqrt(vx * vx + cy * cy), 1), px + 12, py - 12, T2.violet, 11.5);
    lbl(ctx, 't = ' + fmt(t, 2), 24, 28, T2.muted, 12);
  },
};
