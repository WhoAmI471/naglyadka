import type { CanvasTheme, Theme } from './types';

/**
 * Canvas palettes. The DOM gets its colours from CSS custom properties, but a
 * 2D context needs concrete values — these mirror the tokens in globals.css.
 */
export const THEMES: Record<Theme, CanvasTheme> = {
  dark: {
    grid: '#16223a',
    line: '#243244',
    faint: 'rgba(148,163,184,0.32)',
    faintSolid: 'rgba(226,232,240,0.85)',
    solid: '#334155',
    primary: '#3b82f6',
    violet: '#a78bfa',
    amber: '#f59e0b',
    amberGlow: 'rgba(245,158,11,0.6)',
    muted: '#94a3b8',
    dim: '#64748b',
    text: '#cbd5e1',
    liquid: 'rgba(148,163,184,0.16)',
  },
  light: {
    grid: '#e8edf5',
    line: '#cbd5e1',
    faint: 'rgba(100,116,139,0.30)',
    faintSolid: 'rgba(71,85,105,0.55)',
    solid: '#94a3b8',
    primary: '#1f6feb',
    violet: '#7047ef',
    amber: '#d97706',
    amberGlow: 'rgba(217,119,6,0.45)',
    muted: '#64748b',
    dim: '#94a3b8',
    text: '#0f172a',
    liquid: 'rgba(100,116,139,0.14)',
  },
};
