import type { Lang } from './types';

export function plural(n: number, forms: [string, string, string]): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return forms[0];
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return forms[1];
  return forms[2];
}

export function wordAids(n: number, lang: Lang): string {
  return lang === 'ru' ? plural(n, ['пособие', 'пособия', 'пособий']) : n === 1 ? 'aid' : 'aids';
}

export function wordSubjects(n: number, lang: Lang): string {
  return lang === 'ru' ? plural(n, ['предмет', 'предмета', 'предметов']) : n === 1 ? 'subject' : 'subjects';
}

export function wordLive(n: number, lang: Lang): string {
  return lang === 'ru' ? plural(n, ['интерактивное', 'интерактивных', 'интерактивных']) : 'interactive';
}

export function nAids(n: number, lang: Lang): string {
  return n + ' ' + wordAids(n, lang);
}

/** Fixed-decimal number with a comma separator, as used throughout the aids. */
export function fmt(n: number, d: number): string {
  if (!isFinite(n)) return '—';
  return (Math.round(n * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d).replace('.', ',');
}

/** Canvas text helper: draw a label and restore left alignment. */
export function lbl(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  size?: number,
  align?: CanvasTextAlign,
): void {
  ctx.fillStyle = color;
  ctx.font = (size || 11) + 'px Inter, sans-serif';
  ctx.textAlign = align || 'left';
  ctx.fillText(text, x, y);
  ctx.textAlign = 'left';
}
