export type Lang = 'ru' | 'en';
export type Theme = 'dark' | 'light';
export type AidType = 'exp' | 'model' | 'graph' | 'algo';
export type SimId = 'ballistics' | 'pendulum' | 'titration';

export interface SubjectText {
  name: string;
  desc: string;
  topics: string[];
}

export interface Subject {
  id: string;
  mono: string;
  ru: SubjectText;
  en: SubjectText;
}

export interface AidText {
  title: string;
  summary: string;
  theory?: string;
}

export interface Aid {
  id: string;
  s: string;
  grade: number;
  type: AidType;
  sim: SimId | null;
  ru: AidText;
  en: AidText;
}

export interface SoonSubject {
  mono: string;
  ru: string;
  en: string;
}

/** Numeric parameters of a single simulation, keyed by control key. */
export type SimParams = Record<string, number>;

export interface SimControl {
  key: string;
  ru: string;
  en: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  unitEn?: string;
  d: number;
}

export interface SimLegend {
  ru: string;
  en: string;
  c: string;
}

export interface Readout {
  label: string;
  value: string;
  unit: string;
}

export interface Formula {
  expr: string;
  sub: string;
  note: string;
}

/** Colour palette handed to the canvas painters — one per theme. */
export interface CanvasTheme {
  grid: string;
  line: string;
  faint: string;
  faintSolid: string;
  solid: string;
  primary: string;
  violet: string;
  amber: string;
  amberGlow: string;
  muted: string;
  dim: string;
  text: string;
  liquid: string;
}

export interface Sim {
  defaults: SimParams;
  controls: SimControl[];
  legend: SimLegend[];
  readouts(p: SimParams, ru: boolean): Readout[];
  formulas(p: SimParams, ru: boolean): Formula[];
  draw(ctx: CanvasRenderingContext2D, w: number, h: number, p: SimParams, time: number, T2: CanvasTheme): void;
}
