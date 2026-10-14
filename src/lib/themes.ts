import type { CanvasTheme, Theme } from './types';

/**
 * Canvas palette. Every scene is drawn inside a lit "frame" — the lamp-coloured
 * slide a filmstrip projector throws on the wall — so both themes paint the
 * scene with the same gouache inks; only the room around the frame changes.
 * These mirror the --ink-* tokens in globals.css.
 */
const LAMP: CanvasTheme = {
  grid: '#E1D8C4',
  line: '#B5A88F',
  faint: 'rgba(42,33,24,0.26)',
  faintSolid: 'rgba(42,33,24,0.78)',
  solid: '#857862',
  primary: '#2F4AA8',
  violet: '#C2391F',
  amber: '#C98A1E',
  amberGlow: 'rgba(201,138,30,0.32)',
  muted: '#5E5242',
  dim: '#857862',
  text: '#2A2118',
  liquid: 'rgba(47,74,168,0.12)',
};

export const THEMES: Record<Theme, CanvasTheme> = {
  dark: LAMP,
  light: LAMP,
};
