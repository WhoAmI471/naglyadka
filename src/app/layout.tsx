import './globals.css';
import { cookies } from 'next/headers';
import type { Metadata, Viewport } from 'next';
import AppShell from '@/components/AppShell';
import { AppProvider } from '@/context/AppContext';
import { L } from '@/lib/i18n';
import { LANG_COOKIE, THEME_COOKIE, toLang, toTheme } from '@/lib/prefs';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const store = await cookies();
  const lang = toLang(store.get(LANG_COOKIE)?.value);
  const t = L[lang];
  return {
    title: { default: `${t.brand} — ${t.eyebrow}`, template: `%s · ${t.brand}` },
    description: t.sub,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  const lang = toLang(store.get(LANG_COOKIE)?.value);
  const theme = toTheme(store.get(THEME_COOKIE)?.value);

  return (
    <html lang={lang} data-theme={theme}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProvider initialLang={lang} initialTheme={theme}>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
