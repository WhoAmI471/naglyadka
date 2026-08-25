'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Toast from './Toast';
import { useApp } from '@/context/AppContext';

export default function AppShell({ children }: { children: ReactNode }) {
  const { t, ru } = useApp();
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  // The drawer never survives a navigation.
  useEffect(() => setNavOpen(false), [pathname]);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen]);

  const menuLabel = ru ? 'Меню' : 'Menu';
  const closeLabel = ru ? 'Закрыть меню' : 'Close menu';

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <button type="button" className="icon-button" aria-label={menuLabel} onClick={() => setNavOpen(true)}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            background: 'linear-gradient(135deg, #1f6feb, #7047ef)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 13,
            color: '#fff',
          }}
        >
          Н
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em' }}>{t.brand}</div>
      </header>

      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} closeLabel={closeLabel} />

      <button
        type="button"
        aria-label={closeLabel}
        tabIndex={navOpen ? 0 : -1}
        className={navOpen ? 'nav-backdrop is-open' : 'nav-backdrop'}
        onClick={() => setNavOpen(false)}
      />

      <main className="app-main">
        <div className="app-content">{children}</div>
      </main>

      <Toast />
    </div>
  );
}
