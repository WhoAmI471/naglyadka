'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { countAids, SOON, SUBJECTS } from '@/lib/data';
import { chip, sidebarLabel } from '@/lib/styles';
import type { Lang, Theme } from '@/lib/types';

const THEME_OPTS: { id: Theme; key: 'dark' | 'light' }[] = [
  { id: 'dark', key: 'dark' },
  { id: 'light', key: 'light' },
];

const LANG_OPTS: { id: Lang; label: string }[] = [
  { id: 'ru', label: 'RU' },
  { id: 'en', label: 'EN' },
];

interface Props {
  open: boolean;
  onClose: () => void;
  closeLabel: string;
}

export default function Sidebar({ open, onClose, closeLabel }: Props) {
  const { lang, theme, t, setLang, setTheme } = useApp();
  const activeSubject = useSelectedLayoutSegment();

  return (
    <aside className={open ? 'app-sidebar is-open' : 'app-sidebar'}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'inherit' }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #1f6feb, #7047ef)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 15,
              color: '#fff',
              boxShadow: '0 4px 14px rgba(31,111,235,0.35)',
            }}
          >
            Н
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em' }}>{t.brand}</div>
            <div style={{ fontSize: 11, color: 'var(--dim)' }}>{t.brandSub}</div>
          </div>
        </Link>
        <button
          type="button"
          className="icon-button sidebar-close"
          aria-label={closeLabel}
          tabIndex={open ? 0 : -1}
          onClick={onClose}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ ...sidebarLabel, padding: '0 10px 6px' }}>{t.catalog}</div>
        {SUBJECTS.map((s) => {
          const on = activeSubject === s.id;
          return (
            <Link
              key={s.id}
              href={`/${s.id}`}
              className={on ? 'nav-item is-active' : 'nav-item'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 13.5,
                fontWeight: 500,
                transition: 'background 0.18s ease',
                ...(on
                  ? { background: 'linear-gradient(135deg, #1f6feb, #7047ef)', color: '#fff' }
                  : { color: 'var(--text)' }),
              }}
            >
              <span style={{ width: 18, textAlign: 'center', fontWeight: 700, fontSize: 12 }}>{s.mono}</span>
              <span style={{ flex: 1 }}>{s[lang].name}</span>
              <span style={{ fontSize: 11, opacity: 0.6 }}>{countAids(s.id)}</span>
            </Link>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ ...sidebarLabel, padding: '0 10px 6px' }}>{t.soon}</div>
        {SOON.map((s) => (
          <div
            key={s.mono}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 10px',
              borderRadius: 8,
              fontSize: 13.5,
              color: 'var(--dim)',
            }}
          >
            <span style={{ width: 18, textAlign: 'center', fontWeight: 700, fontSize: 12, opacity: 0.7 }}>{s.mono}</span>
            <span style={{ flex: 1 }}>{s[lang]}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>
          <div style={{ ...sidebarLabel, marginBottom: 6 }}>{t.theme}</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {THEME_OPTS.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setTheme(o.id)}
                style={{ ...chip(theme === o.id), flex: 1 }}
              >
                {t[o.key]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ ...sidebarLabel, marginBottom: 6 }}>{t.lang}</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {LANG_OPTS.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setLang(o.id)}
                style={{ ...chip(lang === o.id), flex: 1 }}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
