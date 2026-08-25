import type { Lang, Theme } from './types';

export const LANG_COOKIE = 'nagl_lang';
export const THEME_COOKIE = 'nagl_theme';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const DEFAULT_LANG: Lang = 'ru';
export const DEFAULT_THEME: Theme = 'dark';

export function toLang(value: string | undefined): Lang {
  return value === 'en' || value === 'ru' ? value : DEFAULT_LANG;
}

export function toTheme(value: string | undefined): Theme {
  return value === 'light' || value === 'dark' ? value : DEFAULT_THEME;
}
