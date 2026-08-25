'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { L } from '@/lib/i18n';
import type { Dict } from '@/lib/i18n';
import { COOKIE_MAX_AGE, LANG_COOKIE, THEME_COOKIE } from '@/lib/prefs';
import type { Lang, Theme } from '@/lib/types';

interface AppState {
  lang: Lang;
  theme: Theme;
  t: Dict;
  ru: boolean;
  toast: string;
  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
  showToast: (message: string) => void;
}

const AppContext = createContext<AppState | null>(null);

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}

export function AppProvider({
  initialLang,
  initialTheme,
  children,
}: {
  initialLang: Lang;
  initialTheme: Theme;
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [toast, setToast] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    writeCookie(LANG_COOKIE, next);
    document.documentElement.lang = next;
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    writeCookie(THEME_COOKIE, next);
    document.documentElement.dataset.theme = next;
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2600);
  }, []);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const value = useMemo<AppState>(
    () => ({ lang, theme, t: L[lang], ru: lang === 'ru', toast, setLang, setTheme, showToast }),
    [lang, theme, toast, setLang, setTheme, showToast],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
