import './globals.css';
import { cookies } from 'next/headers';
import { Onest, Podkova } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import AppShell from '@/components/AppShell';
import { AppProvider } from '@/context/AppContext';
import { L } from '@/lib/i18n';
import { LANG_COOKIE, THEME_COOKIE, toLang, toTheme } from '@/lib/prefs';

// Onest carries the interface; Podkova, a slab with the set of a printed
// filmstrip caption, carries titles, captions and formulas.
const ui = Onest({ subsets: ['latin', 'cyrillic'], variable: '--font-ui', display: 'swap' });
const display = Podkova({ subsets: ['latin', 'cyrillic'], variable: '--font-display', display: 'swap' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
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
    <html lang={lang} data-theme={theme} className={`${ui.variable} ${display.variable}`}>
      <body>
        <AppProvider initialLang={lang} initialTheme={theme}>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
