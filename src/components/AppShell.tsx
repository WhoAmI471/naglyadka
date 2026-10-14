'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Toast from './Toast';
import { useApp } from '@/context/AppContext';

export default function AppShell({ children }: { children: ReactNode }) {
  const { t } = useApp();
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

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <button type="button" className="icon-button" aria-label={t.menu} onClick={() => setNavOpen(true)}>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M3 5.5h14M3 10h14M3 14.5h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <Link href="/" className="brand" style={{ padding: 0 }}>
          <span className="brand-name">{t.brand}</span>
        </Link>
      </header>

      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />

      <button
        type="button"
        aria-label={t.closeMenu}
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
